import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { UserInterface } from 'src/types/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  // Methode pour recupérer l'utilisateur en question
  async findUserByUsername(username: string): Promise<User | undefined> {
    // username = username ou email
    const user = await this.userRepository.findOneBy({ username: username });
    if (!user) {
      return await this.userRepository.findOneBy({ email: username });
    }
    return user;
  }

  // Inscritption nouvel utilisateur
  async createUser(user: User) {
    const { username, email, password } = user;

    // On verifie d'abord si l'mail de l'utilisateur existe
    const userExist = await this.userRepository.findOneBy({ email: email });
    if (userExist) {
      throw new HttpException(
        `This email exist in database!`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Instance de notre objet User
    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;

    // Puis on sauvegarde dans la BDD
    const result = await this.userRepository.save(newUser);
    if (!result)
      throw new HttpException('Error save user!', HttpStatus.BAD_REQUEST);

    return result;
  }

  // Mise à jour info utilisateur
  async updateUser(userId: number, user: UserInterface) {
    // On va récupérer d'abord l'user en question
    const userUpdated = await this.userRepository.findOneBy({ id: userId });

    if (!userUpdated) {
      throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
    }

    let profile: Profile;
    if (user.profile) {
      if (!userUpdated.profile?.id) {
        // Ajout nouveau profile utilisateur
        const newProfile = new Profile();
        profile = await this.addProfile(newProfile, user);
      } else {
        // Mise à jour profile utilisateur
        const profileUpdated = await this.profileRepository.findOneBy({
          id: user.profile.id,
        });
        if (!profileUpdated) {
          throw new HttpException(
            'Profil user not found!',
            HttpStatus.BAD_REQUEST,
          );
        }

        await this.addProfile(profileUpdated, user);
      }
    }

    // Mise à jour utilisateur
    userUpdated.username = user.username;
    if (profile) userUpdated.profile = profile;
    await this.userRepository.save(userUpdated);
  }

  private async addProfile(
    newProfile: Profile,
    user: UserInterface,
  ): Promise<Profile> {
    newProfile.nom = user.profile.nom;
    newProfile.prenom = user.profile.prenom;
    newProfile.tel = user.profile.tel;
    newProfile.adresse = user.profile.adresse;
    newProfile.genre = user.profile.genre;
    newProfile.ville = user.profile.ville;
    newProfile.pays = user.profile.pays;
    newProfile.nationalite = user.profile.nationalite;
    newProfile.photo = user.profile.photo;

    return await this.profileRepository.save(newProfile);
  }
}

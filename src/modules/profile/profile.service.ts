import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './Profile';
import { Repository } from 'typeorm';
import { User } from '../user/User';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // Création nouveau profile utilisateur
  async createProfile(userId: any, profile: Profile) {
    // On va verifier si l'id de l'utilisaeur est valide
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
    }

    // On va instancier notre classe Profile
    const newProfile = new Profile();
    return await this.addProfile(newProfile, profile, user);
  }

  // Mise à jour infos profile utilisateur
  async editProfile(id: number, profile: Profile) {
    // On va récuperer d'abord le profile en question
    const profileUpdated = await this.profileRepository.findOneBy({ id: id });
    if (!profileUpdated) {
      throw new HttpException(
        'Profile user not found!',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Puis on sauvegarde dans la BDD
    return await this.addProfile(profileUpdated, profile, null);
  }

  private async addProfile(newProfile: Profile, profile: Profile, user: User) {
    newProfile.nom = profile.nom;
    newProfile.prenom = profile.prenom;
    newProfile.tel = profile.tel;
    newProfile.adresse = profile.adresse;
    newProfile.genre = profile.genre;
    newProfile.ville = profile.ville;
    newProfile.pays = profile.pays;
    newProfile.nationalite = profile.nationalite;
    newProfile.photo = profile.photo;
    if (user) {
      newProfile.user = user;
    }

    return await this.profileRepository.save(newProfile);
  }
}

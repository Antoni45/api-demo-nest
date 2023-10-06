import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserInterface } from 'src/types/UserInterface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // Methode pour recupérer l'utilisateur en question
  async findUserByUsername(username: string): Promise<User | undefined> {
    // La valeur de parm "username" soit username ou email
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
    newUser.password = await bcrypt.hash(password, 10);

    // Puis on sauvegarde dans la BDD
    const result = await this.userRepository.save(newUser);
    if (!result)
      throw new HttpException('Error save user!', HttpStatus.BAD_REQUEST);

    return result;
  }

  // Rénitialisation d'un mot de passe utilisateur
  // resetPassword(email: string) {}

  // Mise à jour infos utilisateur
  async updateInfoUser(id: number, data: UserInterface) {
    const { username, email, currentPassword, newPassword } = data;
    // On va récupérer d'abord l'utilisateur à modifier
    const userUpdated = await this.userRepository.findOneBy({ id: id });
    if (!userUpdated) {
      throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
    }
    const isMatch = await bcrypt.compare(currentPassword, userUpdated.password);
    if (!isMatch) {
      throw new HttpException(
        'Your current password is wrong!',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Ici c'est la modification
    userUpdated.username = username ?? userUpdated.username;
    userUpdated.email = email ?? userUpdated.email;
    userUpdated.password =
      (await bcrypt.hash(newPassword, 10)) ?? userUpdated.password;

    return await this.userRepository.save(userUpdated);
  }
}

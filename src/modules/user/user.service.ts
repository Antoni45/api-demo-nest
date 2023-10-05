import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

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
}

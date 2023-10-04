import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
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
}

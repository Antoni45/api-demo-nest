import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/user/user.entity';
import { UsersService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.userService.findUserByUsername(username);
    if (!user || user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    return {
      userId: user.id,
      username: user.username,
      email: user.email,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  registration(user: User) {
    return this.userService.createUser(user);
  }
}

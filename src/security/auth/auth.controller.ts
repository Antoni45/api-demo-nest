import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/modules/user/User';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    try {
      return this.authService.signIn(username, password);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('registration')
  registration(@Body() user: User) {
    try {
      return this.authService.registration(user);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('logout')
  async logout(@Req() req: any) {
    const token = req.headers.authorization?.split(' ')[1];
    await this.authService.addToBlacklist(token);
    return { message: 'Déconnexion réussie!' };
  }
}

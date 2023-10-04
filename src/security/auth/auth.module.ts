import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './constant';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstant.secret,
      signOptions: { expiresIn: '7200s' }, // Equivalent de 2h
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

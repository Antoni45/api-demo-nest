import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './Profile';
import { User } from '../user/User';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class PofileModule {}

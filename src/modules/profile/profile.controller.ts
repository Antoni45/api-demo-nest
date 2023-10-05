import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './Profile';
import { AuthGuard } from 'src/security/auth/auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post(':id')
  @UseGuards(AuthGuard)
  create(@Param('id', ParseIntPipe) userId: number, @Body() profile: Profile) {
    try {
      return this.profileService.createProfile(userId, profile);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() profile: Profile) {
    try {
      return this.profileService.editProfile(id, profile);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}

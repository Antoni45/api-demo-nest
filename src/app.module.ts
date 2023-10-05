import { Module } from '@nestjs/common';
import { AuthModule } from './security/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db.config';
import { PofileModule } from './modules/profile/pofile.module';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), AuthModule, PofileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

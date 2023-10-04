import { Module } from '@nestjs/common';
import { AuthModule } from './security/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/db.config';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

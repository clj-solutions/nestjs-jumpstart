import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature(),
  ],
  controllers: [ UserController]

})
export class UserModule {
  
}

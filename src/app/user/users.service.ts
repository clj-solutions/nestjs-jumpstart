import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getRepository } from 'typeorm'
import { User } from './user.entity'
import { UserCreateDto } from './dto/user.create.dto'
import { UserLoginDto } from './dto/user.login.dto'
import { HttpException } from '@nestjs/common/exceptions/http.exception'
import { HttpStatus } from '@nestjs/common'
import { validate } from 'class-validator'
import * as argon2 from 'argon2'
const jwt = require('jsonwebtoken')

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>)
  {

  }

  async findOne(loginDto: UserLoginDto): Promise<User> {
    const user = await this.userRepository.findOne(loginDto.username);
    if(!user)
    {
      return null;
    }

    if(await argon2.verify(user.password, loginDto.password)) {
      return user;
    }

    return null;
  }

  async create(dto: UserCreateDto): Promise<User> {
    const {username, email, password} = dto;
    const db = await getRepository(User).createQueryBuilder('user').where('user.username = :username', {username})
    .orWhere('user.email = :email', {email});

    const user = await db.getOne();
    if(user)
    {
      const errors = {username: 'Username and email must be unique.'};
      throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
    }

    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;

    const errors = await validate(newUser);
    if(errors.length > 0) {
      const _errors = {username: 'Userinput is not valid.'};
      throw new HttpException({message: 'Input data validation failed.', _errors}, HttpStatus.BAD_REQUEST);
    } else {
      const savedUser = await this.userRepository.save(newUser);
      return savedUser;
    }
  }
}

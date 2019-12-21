import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from '../../user/user.entity'

@Injectable()
export default class AuthValidateUserService {
  constructor(@InjectRepository(User) protected userRepository: Repository<User>) {}

  async call(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({email: email})
    if(await this.isPasswordMatched(user, password)) {
      delete user.passwordHash
      return user
    }

    return null
  }

  protected async isPasswordMatched(user: User, password: string): Promise<boolean> {
    if(!user) return false;

    return user.passwordHash && (await bcrypt.compare(password, user.passwordHash))
  }
}

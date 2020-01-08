import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>)
  {}

  find(id: number): Promise<User> {
    return this.userRepository.findOne({id: id})
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({email: email})
  }
}

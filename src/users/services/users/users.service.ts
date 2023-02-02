import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/index';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dtos/users.dtos';
import * as bcrypt from 'bcrypt'
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
      
  async createUser(createUserDto: CreateUserDto) {
    let hashPwd = await bcrypt.hash(createUserDto.password, 10)
    createUserDto.password = hashPwd

    const newUser = this.userRepository.create(createUserDto);

    return this.userRepository.save(newUser);
  }

  findByEmail(email: string){
    return this.userRepository.findOneBy({email: email})
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entities/index';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../dtos/users.dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
      
  createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }
      
  findUsersById(id: number) {
    return this.userRepository.findOneBy({id: id});
  }

  getUsers(){
    return this.userRepository.find()
  }

  deleteUser(id: number){
    return this.userRepository.delete(id)
  }

  findByEmail(email: string){
    return this.userRepository.findOneBy({email: email})
  }
}

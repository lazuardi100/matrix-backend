import { Injectable } from '@nestjs/common';
import { UsersService } from '../../../users/services/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ){}

  async validateUser(email: string, pass: string): Promise <any>{
    const user = await this.usersService.findByEmail(email);
    
    if (user == null) return null;

    const isMatch = await bcrypt.compare(pass, user.password);

    if (isMatch){
      const {password, ...result} = user
      return result
    }
    return null
  }

  async login (user: any){
    const payload = {username: user.email, sub: user.id};
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}

import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService){}

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
}

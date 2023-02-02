import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { AuthService } from '../../services/auth/auth.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req){
    // console.log(req);
    return this.authService.login(req.user, false);
  }

  @Post('login_web3')
  async login_web3(@Request() req){
    const wallet_address = req.body.wallet_address
    return this.authService.login(wallet_address, true);
  }

  @UseGuards(JwtAuthGuard)
  @Get('check_login')
  checkLogin(@Request() req){
    return {
      "status": 200,
      "msg": "logged in"
    };
  }
}

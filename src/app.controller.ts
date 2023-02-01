import { Controller, Get, Req, UseGuards, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { findNumber } from './helpers/solver.helper';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Post('solve_problem')
  solveProblem(@Req() params){
    let matrix = []
    try{
      matrix = JSON.parse(params.body.matrix)
    }catch{
      return {
        status: 400,
        msg: "invalid format"
      }
    }
    const target = parseInt(params.body.find_number)

    return findNumber(matrix, target)
  }
}

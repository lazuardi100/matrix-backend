import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('solve_problem')
  solveProblem(@Req() params){
    const matrix = JSON.parse(params.body.matrix)
    const findNumber = params.body.find_number
    console.log(matrix[0]);
    return {
      status: 200
    }
  }
}

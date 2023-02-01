import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/users.dtos';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
  
  @Get('id/:id')
  async findUsersById(@Param('id', ParseIntPipe) id: number) {
    const existingUser = await this.userService.findUsersById(id);
    
    return existingUser
  }
  
  @Post('create')
  @UsePipes(ValidationPipe)
  async createUsers(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(createUserDto.email);
    if (existingUser != null){
      throw new BadRequestException('Email already exist');
    }
    this.userService.createUser(createUserDto);
    return {
      "status": "ok"
    }
  }

  @Get('delete/:id')
  deleteUsersById(@Param('id', ParseIntPipe) id: number){
    return this.userService.deleteUser(id)
  }
}

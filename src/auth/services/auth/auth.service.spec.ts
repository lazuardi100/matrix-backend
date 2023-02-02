import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../../../users/services/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../../entities/user.entity';
import * as bcrypt from 'bcrypt'

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue:{
            findByEmail: jest.fn((x)=>x)
          }
        },
        {
          provide: JwtService,
          useValue:{
            sign: jest.fn((x)=>'123')
          }
        },{
        provide: getRepositoryToken(User),
        useValue: {
          sign: jest.fn((x)=>x)
        }
      }],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('user servuce should be defined',()=>{
    expect(userService).toBeDefined();
  })

  describe('validating user',()=>{
    it('should be null if user null',async()=>{
      const testResult = await service.validateUser(null, 'testing')
      expect(testResult).toBe(null)
    })

    it('should be null if password not match',async()=>{
      jest.spyOn(bcrypt,'compare').mockReturnValueOnce(null)
      const testResult = await service.validateUser('testing', 'testing')
      expect(testResult).toBe(null)
    })
  })

  describe('login access token', ()=>{
    it('should get token',async()=>{
      // jest.spyOn(jwtService,'sign').mockReturnValueOnce(()=>"123")
      const testResult = await service.login('testing', true)
      expect(testResult).toMatchObject({
        access_token: "123"
      })
    })
  })

  describe('login web 3 access token', ()=>{
    it('should get token',async()=>{
      // jest.spyOn(jwtService,'sign').mockReturnValueOnce(()=>"123")
      const testResult = await service.login('testing', false)
      expect(testResult).toMatchObject({
        access_token: "123"
      })
    })
  })
});

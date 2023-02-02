import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../../services/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../../users/services/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../../entities/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, JwtService, UsersService,{
        provide: getRepositoryToken(User),
        useValue: {
          sign: jest.fn((x)=>x)
        }
      }]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get login token',async ()=>{
    jest.spyOn(authService, 'login').mockReturnValueOnce(Promise.resolve({
      access_token: "testingtoken"
    }))
    const testResult = await controller.login("login_payload")
    expect(testResult).toMatchObject({
      access_token: "testingtoken"
    })
  })

  it('should get login token',async ()=>{
    jest.spyOn(authService, 'login').mockReturnValueOnce(Promise.resolve({
      access_token: "testingtoken"
    }))
    const payload = {
      body:{
        wallet_address: "testwalletaddress"
      }
    }
    const testResult = await controller.login_web3(payload)
    expect(testResult).toMatchObject({
      access_token: "testingtoken"
    })
  })

  it('should get login token',async ()=>{
    const payload = {
      req: {
        user:"testing"
      }
    }
    const testResult = await controller.checkLogin(payload)

    expect(testResult).toMatchObject({
      "status": 200,
      "msg": "logged in"
    })
  })
});

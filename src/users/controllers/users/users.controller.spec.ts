import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../entities/user.entity';
import { UsersService } from '../../services/users/users.service';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let userRepository: Repository<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers:[UsersService,{
        provide: getRepositoryToken(User),
        useValue: {
          create: jest.fn(),
          save: jest.fn(),
          findOneBy: jest.fn()
        }
      }]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User))
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Creating user', () => {
    it('should be bad request',async ()=>{
      // jest.spyOn(service, 'findByEmail').mockResolvedValue(null)
      const test = await controller.createUsers({
        email: "testing@mail.com",
        password: "testing123"
      })
      
      expect(test).toHaveBeenCalledWith({
        "status": "ok"
      })
    })
  })
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../../entities/index';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repo should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  it("should creating user", async () => {
    jest.spyOn(userRepository, 'create').mockReturnValueOnce({
      id: 1,
      email: "testing@mail.com",
      password: "testing123",
    })
    await service.createUser({
      email: "testing@mail.com",
      password:"testing123"
    });
    expect(userRepository.save).toHaveBeenCalledWith({
      id: 1,
      email: "testing@mail.com",
      password:"testing123"
    })
  })

  it("should find user by email", async ()=>{
    
    await service.findByEmail("testing@mail.com")
    expect(userRepository.findOneBy).toBeCalled()
  })
});

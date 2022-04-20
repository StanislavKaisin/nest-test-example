import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockUsersRepository = {
    create: jest.fn().mockImplementation((dto) => {
      return dto;
    }),
    save: jest
      .fn()
      .mockImplementation((user) =>
        Promise.resolve({ id: Date.now(), ...user }),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and return a new user', async () => {
    const user = { name: 'Marius' };
    expect(await service.create(user)).toEqual({
      id: expect.any(Number),
      ...user,
    });
  });
});

//npm run test:watch

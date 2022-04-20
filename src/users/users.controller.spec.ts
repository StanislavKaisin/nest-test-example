import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUserService = {
    create: jest.fn((dto) => {
      return { ...dto, id: 1 };
    }),
    update: jest.fn().mockImplementation((id, dto) => ({
      id,
      ...dto,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    const dto = { name: 'Marius' };
    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      name: dto.name,
    });
    expect(mockUserService.create).toHaveBeenCalled();
    expect(mockUserService.create).toHaveBeenCalledTimes(1);
    expect(mockUserService.create).toHaveBeenCalledWith(dto);
  });

  it('should update a user', () => {
    const dto = { name: 'Marius' };
    expect(controller.update(' 1', dto)).toEqual({
      id: 1,
      ...dto,
    });
    expect(mockUserService.update).toHaveBeenCalled();
    expect(mockUserService.update).toHaveBeenCalledTimes(1);
    expect(mockUserService.update).toHaveBeenCalledWith(1, dto);
  });
});

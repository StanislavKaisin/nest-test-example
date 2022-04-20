import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
// import { UsersModule } from './src/users/users.module';
import { UsersModule } from '../src/users/users.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  const mockUsers = [{ id: 1, name: 'Marius' }];

  const mockUsersRepository = {
    // findAll: jest.fn().mockImplementation(() => Promise.resolve(mockUsers)),
    find: jest.fn().mockResolvedValue(mockUsers),
    save: jest
      .fn()
      .mockImplementation((user) =>
        Promise.resolve({ id: Date.now(), ...user }),
      ),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUsersRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(mockUsers);
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ name: 'Bob' })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(Number),
          name: 'Bob',
        });
      });
  });

  //if ony we have this validation pipeline
  it('/users (POST) --> 400 on validation error', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ name: 225252 })
      .expect('Content-Type', /json/)
      .expect(400, {
        statusCode: 400,
        message: ['name must be a string'],
        error: 'Bad request',
      });
    // .expect({
    //   statusCode: 400,
    //   message: ['name must be a string'],
    //   error: 'Bad request',
    // });
  });
});

// tests for app module fails

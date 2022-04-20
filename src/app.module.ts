import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // TypeOrmModule.forFeature([User]),
    // UsersModule,

    // TypeOrmModule.forRoot(config)
    TypeOrmModule.forRoot({}),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Token } from './entities/token.entity';
import { TokenService } from './token.service';

@Module({
  controllers: [UserController],
  providers: [UserService, TokenService],
  imports: [TypeOrmModule.forFeature([User, Token])],
})
export class UserModule {}

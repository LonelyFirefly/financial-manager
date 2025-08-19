import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import bcrypt from 'bcrypt';
import { TokenService } from './token.service';
import { TokenDto } from './dto/token.dto';
import jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Token)
    private readonly tokenService: TokenService,
  ) {}

  async register(registerDto: RegisterUserDto) {
    const user = await this.userRepository.findOneBy({
      email: registerDto.email,
    });

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashPassword = await bcrypt.hash(registerDto.password, 10);

    const newUser = await this.userRepository.save({
      ...registerDto,
      password: hashPassword,
    });

    const dto = new TokenDto(newUser);
    const tokens = this.tokenService.generateToken(dto);

    return {
      user: newUser,
      tokens,
    };
  }

  async refresh(refreshToken?: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    try {
      const userTokenData = this.tokenService.validateToken(refreshToken);
      const token = await this.tokenService.findToken(refreshToken);

      if (!userTokenData || !token) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const user = await this.userRepository.findOneBy({
        id: token.user.id,
      });

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const tokens = this.tokenService.generateToken(new TokenDto(user));
      await this.tokenService.updateToken(token.id, tokens.refreshToken);

      return { ...tokens, user };
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      throw new UnauthorizedException('Unauthorized');
    }
  }
}

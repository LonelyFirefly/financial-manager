import { BadRequestException } from '@nestjs/common';
import { TokenDto } from './dto/token.dto';
import jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  generateToken(dto: TokenDto) {
    const accessToken = jwt.sign(dto, this._getSecret(), {
      expiresIn: '1h',
    });

    const refreshToken = jwt.sign(dto, this._getSecret(), {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  validateToken(token: string) {
    const data = jwt.verify(token, this._getSecret(), {
      complete: true,
    });

    return data.payload;
  }

  findToken(refreshToken: string) {
    return this.tokenRepository.findOneBy({ refreshToken: refreshToken });
  }

  updateToken(id: string, refreshToken: string) {
    return this.tokenRepository.update(id, { refreshToken });
  }

  _getSecret() {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new BadRequestException('JWT secret is not defined');
    }

    return secret;
  }
}

import { User } from '../entities/user.entity';

export class TokenDto {
  readonly id: number;
  readonly email: string;
  readonly isActive: boolean;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.isActive = user.isActive;
  }
}

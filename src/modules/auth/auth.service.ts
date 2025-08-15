import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import ApiError from '../api-error/api-error';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}
  async login(createAuthDto: CreateAuthDto) {
    const user = await this.userService.findByEmail(createAuthDto.email);

    if (
      !user ||
      !bcrypt.compareSync(createAuthDto.password, user.password)
    ) {
      throw new ApiError(
        'Invalid email or password',
        'Email ou senha inválidos',
        401
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return {
      access_token: this.jwtService.sign(result),
    };
  }
}

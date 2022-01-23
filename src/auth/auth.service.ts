import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(nick: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneBy({ nick });
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { nick: user.nick, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const exists = await this.usersService.findOneBy({
      nick: registerDto.nick,
    });
    if (exists) {
      throw new HttpException(
        'user with that nick already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.usersService.create(registerDto);
    const payload = { nick: user.nick, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

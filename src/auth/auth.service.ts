import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { Md5 } from 'md5-typescript';
import { User } from '../users/user.entity';
import { JwtPayload } from './jwt.payload';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async validate(userData: User): Promise<User> {
    return await this.userService.findByEmailAndPassword(
      userData.email,
      Md5.init(userData.password),
    );
  }

  public async login(user: User): Promise<any | { status: number }> {
    return this.validate(user).then((userData) => {
      if (!userData) {
        throw new HttpException(
          'Invalid email or password',
          HttpStatus.NOT_FOUND,
        );
      }

      return this.createJwtPayload(userData);
    });
  }

  createJwtPayload(userData) {
    const data: JwtPayload = {
      email: userData.email,
    };
    const accessToken = this.jwtService.sign(data);

    return {
      expires_in: 3600 * 24 * 30,
      accessToken: accessToken,
      user: userData,
      status: 200,
    };
  }

  async validateUserByJwt(payload: JwtPayload) {
    // This will be used when the user has already logged in and has a JWT
    const user = await this.userService.findUserByEmail(payload.email);

    if (user) {
      return this.createJwtPayload(user);
    } else {
      throw new UnauthorizedException();
    }
  }
}

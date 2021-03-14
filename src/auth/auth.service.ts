import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { User } from '../users/user.entity';
import { Md5 } from 'md5-typescript';

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
      const payload = `${userData.email} ${userData._id}`;
      const accessToken = this.jwtService.sign(payload);

      return {
        expires_in: 3600,
        accessToken: accessToken,
        user: userData,
        status: 200,
      };
    });
  }
}

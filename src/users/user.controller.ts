import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  getHello(): string {
    this.userService
      .findAll()
      .then((result: any) => {
        console.log(result);
      })
      .catch((e) => {
        console.log(e);
      });
    return 'aaa';
  }
}

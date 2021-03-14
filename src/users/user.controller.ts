import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Incident } from '../incident/incident.entity';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async createUser(@Body() user: User) {
    return this.userService.create(user);
  }

  @Get('/getAll')
  async getAll() {
    return this.userService.findAllUserByRole('user');
  }
}

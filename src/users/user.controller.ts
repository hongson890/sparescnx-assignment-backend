import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}

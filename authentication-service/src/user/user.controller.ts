import { Controller, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { LocalAuthGuard } from '../strategies/local-auth.guard';
import { JwtAuthGuard } from '../strategies/jwt-auth.guard';
import { ExistsAuthGuard } from '../strategies/exists-auth.guard';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(ExistsAuthGuard)
  @MessagePattern('register')
  async register(command) {
    return this.userService.register(command.data);
  }

  @MessagePattern('forgot-password')
  async forgetPassword(command) {
    return this.userService.forgetPassword(command.data);
  }

  @UseGuards(LocalAuthGuard)
  @MessagePattern('login')
  async login(command) {
    const { email, password } = command.user;
    console.log('command user: ', command.user);
    return this.userService.login(email, password);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('me')
  async me(command) {
    const { id, ...rest } = command.user;
    return rest;
  }

//   @MessagePattern('isAutheticated')
//   async isAutheticated(command) {
//     try {
//       return this.userService.validateToken(command.jwt);
//     } catch (err) {
//       return false;
//     }
//   }

  @MessagePattern('getUserbyID')
  async getUserbyID(command) {
    return this.userService.getUserbyID(command.userID);
  }
}

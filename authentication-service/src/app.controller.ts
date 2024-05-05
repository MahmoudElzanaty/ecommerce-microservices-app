/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './decorators/role.decorator';
import { UserService } from './user/user.service';
import { CreateUserDto } from './user/dto/create.user.dto';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService, private readonly userService: UserService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Roles('admin', 'moderator')
  @Get('private-access')
  getAccessToSourcesWhichOnlyAdminModeratorCanAccess(): string {
    return this.appService.getHello();
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    try {
      // Basic validation to ensure required fields are provided
      if (!createUserDto.username || !createUserDto.password) {
        throw new BadRequestException('username and password are required');
      }
      const newUser = await this.userService.register(createUserDto);
      return { success: true, data: newUser }; // Return successful response
    } catch (error) {
      // Handle any errors thrown during registration
      return { success: false, message: error }; // Return error response
    }
  }




}

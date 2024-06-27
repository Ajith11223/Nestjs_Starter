import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { validate } from 'class-validator';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // create user
  @ApiOperation({ summary: 'Register new user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'John Doe' },//test
        email: { type: 'string', example: "example@gmail.com" },
        password: { type: "string", example: "12345" }
      }
    }
  })
  @Post("register")
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const errors = await validate(createUserDto);
    if (errors.length > 0) {
      throw new Error("errors");
    }
    const user = await this.usersService.create(createUserDto);
    return res.status(201).json({ msg: "created ok" });
  }



  // login a user
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: "example@gmail.com" },
        password: { type: "string", example: "12345" }
      }
    }
  })
  @Post('login')
  @HttpCode(201)
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const errors = await validate(loginDto);
    if (errors.length > 0) {
      throw new Error("errors");
    }
    const user = await this.usersService.login(loginDto);
    return res.status(201).json({ msg: "login ok" });
  }

  // get operation
  @ApiOperation({ summary: 'Get all users' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
    return this.usersService.update(id, UpdateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

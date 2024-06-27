import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/users.interface';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) { }
  async create(user: User): Promise<User> {
    try {

      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(user.password, salt);
      user.password = hashedPass;

      // Creating and saving the new user
      const createdUser = new this.userModel(user);
      const userc = await createdUser.save();
      return userc;
    } catch (error) {
       throw new InternalServerErrorException('Failed to create user',error);
    }
  }


  // login
  async login(loginDto: LoginDto) {
    try {
      const user = await this.userModel.findOne({ email: loginDto.email });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      const isPasswordMatching = await bcrypt.compare(loginDto.password, user.password);

      if (!isPasswordMatching) {
        throw new UnauthorizedException('Invalid password');
      }
      return user; 
    } catch (error) {
      throw new UnauthorizedException('Login failed: ' + error.message);
    }
  }


  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    return this.userModel.findOne({ _id: id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, { $set: updateUserDto }, { new: true });
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}

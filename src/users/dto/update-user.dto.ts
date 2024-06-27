import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsString, MinLength ,MaxLength, IsBoolean, IsDate} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(4)
    readonly password: string;
}

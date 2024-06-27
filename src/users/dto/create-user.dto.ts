import { IsEmail, IsNotEmpty, IsString, MinLength ,MaxLength, IsBoolean, IsDate} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(4)
     password: string;



}

import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  company!: string;

  @IsString()
  @IsNotEmpty()
  message!: string;
}

import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLeadDto {
  @ApiProperty({
    description: "Full name of the lead",
    example: "John Doe",
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: "Email address of the lead",
    example: "john.doe@company.com",
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: "Company name",
    example: "Acme Corp",
  })
  @IsString()
  @IsNotEmpty()
  company!: string;

  @ApiProperty({
    description: "Message or inquiry from the lead",
    example: "Interested in AI consultation services for our team",
  })
  @IsString()
  @IsNotEmpty()
  message!: string;
}

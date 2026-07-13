import { IsEmail, IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({ description: 'User email', example: 'user@example.com' })
  @IsString()
  @IsEmail()
  @Transform(({ value }: { value: string }) => value?.toLowerCase())
  email: string;

  @ApiProperty({ description: 'User password', example: 'password123' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'Full name of the user', example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Unique username', example: 'johndoe' })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'User description/bio',
    example: 'Software Engineer',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}

import { IsNotEmpty, IsOptional, IsString, IsUrl, IsNumber, Allow } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLinkDto {
  @ApiProperty({ description: 'The URL of the link', example: 'https://google.com' })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ description: 'The title of the link', example: 'Google' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The description of the link', example: 'Search Engine', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'The image URL for the link', example: 'https://example.com/image.png', required: false })
  @IsString()
  @IsOptional()
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  image?: string;

  @ApiProperty({ description: 'The order of the link', example: 0, required: false })
  @IsNumber()
  @IsOptional()
  order?: number;

  @ApiProperty({ description: 'Social platform name (null for custom links)', example: 'GitHub', required: false })
  @IsString()
  @IsOptional()
  platform?: string;
}

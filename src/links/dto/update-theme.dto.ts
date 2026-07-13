import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateThemeDto {
  @ApiProperty({ description: 'Background color', example: '#9333ea', required: false })
  @IsString()
  @IsOptional()
  bgColor?: string;

  @ApiProperty({ description: 'Background gradient', example: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', required: false })
  @IsString()
  @IsOptional()
  bgGradient?: string;

  @ApiProperty({ description: 'Button style', example: 'rounded', required: false })
  @IsString()
  @IsOptional()
  buttonStyle?: string;

  @ApiProperty({ description: 'Font family', example: 'sans', required: false })
  @IsString()
  @IsOptional()
  fontFamily?: string;
}

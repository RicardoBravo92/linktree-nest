import { IsArray, IsNotEmpty, IsString, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class SocialLinkItem {
  @ApiProperty({ description: 'Social platform name', example: 'instagram' })
  @IsString()
  @IsNotEmpty()
  platform: string;

  @ApiProperty({ description: 'Social profile URL', example: 'https://instagram.com/user' })
  @IsString()
  @IsNotEmpty()
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  url: string;
}

export class UpdateSocialLinksDto {
  @ApiProperty({ description: 'Array of social links', type: [SocialLinkItem] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialLinkItem)
  socialLinks: SocialLinkItem[];
}

import { IsArray, IsInt, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ReorderItem {
  @ApiProperty({ description: 'Link ID', example: 1 })
  @IsInt()
  @Min(1)
  id: number;

  @ApiProperty({ description: 'New order position', example: 0 })
  @IsInt()
  @Min(0)
  order: number;
}

export class ReorderLinksDto {
  @ApiProperty({ description: 'Array of link IDs with new order', type: [ReorderItem] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReorderItem)
  links: ReorderItem[];
}

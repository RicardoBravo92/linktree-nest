import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { AuthGuard } from '../auth/auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('links')
@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new link' })
  @ApiResponse({ status: 201, description: 'Link successfully created' })
  create(@Body() createLinkDto: CreateLinkDto, @GetUser('id') userId: number) {
    return this.linksService.create(createLinkDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all links' })
  @ApiResponse({ status: 200, description: 'List of links' })
  findAll() {
    return this.linksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a link by ID' })
  @ApiResponse({ status: 200, description: 'Link found' })
  @ApiResponse({ status: 404, description: 'Link not found' })
  findOne(@Param('id') id: string) {
    return this.linksService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a link' })
  @ApiResponse({ status: 200, description: 'Link successfully updated' })
  update(
    @Param('id') id: string,
    @Body() updateLinkDto: UpdateLinkDto,
    @GetUser('id') userId: number,
  ) {
    return this.linksService.update(+id, updateLinkDto, userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a link' })
  @ApiResponse({ status: 200, description: 'Link successfully deleted' })
  remove(@Param('id') id: string, @GetUser('id') userId: number) {
    return this.linksService.remove(+id, userId);
  }


  @Get('user/:username')
  @ApiOperation({ summary: 'Get links by username' })
  @ApiResponse({ status: 200, description: 'List of links' })
  findByUsername(@Param('username') username: string) {
    return this.linksService.findByUsername(username);
  }
}

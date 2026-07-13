import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateThemeDto } from '../links/dto/update-theme.dto';
import { UpdateSocialLinksDto } from '../links/dto/social-links.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from './auth.guard';
import { GetUser } from './decorators/get-user.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'User already exists' })
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('avatar')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload user avatar' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Avatar successfully uploaded' })
  uploadAvatar(
    @GetUser('id') userId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.authService.uploadAvatar(userId, file);
  }

  @Patch('profile')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'Profile successfully updated' })
  updateProfile(
    @GetUser('id') userId: number,
    @Body() updateAuthDto: UpdateAuthDto,
  ) {
    return this.authService.update(String(userId), updateAuthDto);
  }

  @Patch('theme')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user theme' })
  @ApiResponse({ status: 200, description: 'Theme successfully updated' })
  updateTheme(
    @GetUser('id') userId: number,
    @Body() updateThemeDto: UpdateThemeDto,
  ) {
    return this.authService.updateTheme(userId, updateThemeDto);
  }

  @Post('social-links')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update social links' })
  @ApiResponse({ status: 200, description: 'Social links successfully updated' })
  updateSocialLinks(
    @GetUser('id') userId: number,
    @Body() updateSocialLinksDto: UpdateSocialLinksDto,
  ) {
    return this.authService.updateSocialLinks(userId, updateSocialLinksDto.socialLinks);
  }
}

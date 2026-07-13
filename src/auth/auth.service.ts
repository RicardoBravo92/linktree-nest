import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private cloudinary: CloudinaryService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const {
      email: rawEmail,
      password,
      name,
      username,
      description,
    } = createAuthDto;
    const email = rawEmail.toLowerCase();

    const userExists = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (userExists) {
      throw new BadRequestException(
        'User with that email or username already exists',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        username,
        description,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      access_token: await this.jwtService.signAsync({
        id: user.id,
        email: user.email,
      }),
    };
  }

  async login(loginDto: LoginDto) {
    const { emailOrUsername, password } = loginDto;

    if (!emailOrUsername || !password) {
      throw new BadRequestException('Email/username and password are required');
    }

    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: emailOrUsername.toLowerCase() },
          { username: emailOrUsername },
        ],
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      access_token: await this.jwtService.signAsync({
        id: user.id,
        email: user.email,
      }),
    };
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    const idNumber = Number(id);

    if (updateAuthDto.email) {
      const existingEmail = await this.prisma.user.findFirst({
        where: {
          email: updateAuthDto.email.toLowerCase(),
          NOT: { id: idNumber },
        },
      });
      if (existingEmail) {
        throw new BadRequestException('This email is already in use by another user');
      }
    }

    if (updateAuthDto.username) {
      const existingUsername = await this.prisma.user.findFirst({
        where: {
          username: updateAuthDto.username,
          NOT: { id: idNumber },
        },
      });
      if (existingUsername) {
        throw new BadRequestException('This username is already in use by another user');
      }
    }

    const user = await this.prisma.user.update({
      where: { id: idNumber },
      data: updateAuthDto,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async uploadAvatar(id: number, file: Express.Multer.File) {
    const result = await this.cloudinary.uploadFile(file);
    const user = await this.prisma.user.update({
      where: { id },
      data: { image: result.secure_url },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateTheme(id: number, themeData: { bgColor?: string; bgGradient?: string; buttonStyle?: string; fontFamily?: string }) {
    const user = await this.prisma.user.update({
      where: { id },
      data: themeData,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

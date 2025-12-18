import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LinksService {
  constructor(private prisma: PrismaService) {}

  async create(createLinkDto: CreateLinkDto, userId: number) {
    return this.prisma.link.create({
      data: {
        ...createLinkDto,
        userId,
      },
    });
  }

  async findAll() {
    return this.prisma.link.findMany();
  }

  async findOne(id: number) {
    const link = await this.prisma.link.findUnique({
      where: { id },
    });

    if (!link) {
      throw new NotFoundException(`Link with ID ${id} not found`);
    }

    return link;
  }

  async update(id: number, updateLinkDto: UpdateLinkDto, userId: number) {
    const link = await this.findOne(id);

    if (link.userId !== userId) {
      throw new ForbiddenException('You are not allowed to update this link');
    }

    return this.prisma.link.update({
      where: { id },
      data: updateLinkDto,
    });
  }

  async remove(id: number, userId: number) {
    const link = await this.findOne(id);

    if (link.userId !== userId) {
      throw new ForbiddenException('You are not allowed to delete this link');
    }

    return this.prisma.link.delete({
      where: { id },
    });
  }

  async findByUsername(username: string) {
    return this.prisma.link.findMany({
      where: { user: { username } },
    });
  }
}

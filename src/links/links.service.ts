import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { ReorderLinksDto } from './dto/reorder.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LinksService {
  constructor(private prisma: PrismaService) {}

  async create(createLinkDto: CreateLinkDto, userId: number) {
    const maxOrder = await this.prisma.link.aggregate({
      where: { userId },
      _max: { order: true },
    });
    const nextOrder = (maxOrder._max.order ?? -1) + 1;

    return this.prisma.link.create({
      data: {
        ...createLinkDto,
        order: createLinkDto.order ?? nextOrder,
        userId,
      },
    });
  }

  async findAll() {
    return this.prisma.link.findMany({ orderBy: { order: 'asc' } });
  }

  async findMyLinks(userId: number) {
    return this.prisma.link.findMany({
      where: { userId },
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: number) {
    const link = await this.prisma.link.findUnique({ where: { id } });
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
    return this.prisma.link.delete({ where: { id } });
  }

  async reorder(reorderLinksDto: ReorderLinksDto, userId: number) {
    const updates = reorderLinksDto.links.map((item) =>
      this.prisma.link.updateMany({
        where: { id: item.id, userId },
        data: { order: item.order },
      }),
    );
    const results = await this.prisma.$transaction(updates);
    const updatedCount = results.reduce((sum, r) => sum + r.count, 0);
    if (updatedCount !== reorderLinksDto.links.length) {
      throw new ForbiddenException('Some links could not be reordered');
    }
    return { message: 'Links reordered successfully' };
  }

  async incrementClicks(id: number) {
    try {
      return await this.prisma.link.update({
        where: { id },
        data: { clicks: { increment: 1 } },
      });
    } catch {
      throw new NotFoundException(`Link with ID ${id} not found`);
    }
  }

  async getAnalytics(userId: number) {
    const links = await this.prisma.link.findMany({
      where: { userId },
      orderBy: { clicks: 'desc' },
    });
    const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
    return { links, totalClicks };
  }

  async findByUsername(username: string) {
    const user = await this.prisma.user.findFirst({
      where: { username },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        description: true,
        bgColor: true,
        bgGradient: true,
        buttonStyle: true,
        fontFamily: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User "${username}" not found`);
    }

    const links = await this.prisma.link.findMany({
      where: { userId: user.id },
      orderBy: { order: 'asc' },
    });

    return { user, links };
  }
}

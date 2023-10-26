import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}
  async create(createBookDto: CreateBookDto) {
    const category_id = parseInt(createBookDto.category_id, 10);
    const categoryExists = await this.prisma.category.findUnique({
      where: { id: category_id },
    });

    if (!categoryExists) {
      throw new NotFoundException('Category not found');
    }

    return this.prisma.book.create({
      data: {
        title: createBookDto.title,
        author: createBookDto.author,
        category: {
          connect: { id: category_id },
        },
      },
    });
  }

  findAll() {
    return this.prisma.book.findMany();
  }

  findOne(id: number) {
    return this.prisma.book.findUnique({where: {id: id}});
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const bookId = parseInt(id, 10);
  
    const updatedCategory = {
      ...updateBookDto,
      category_id: parseInt(updateBookDto.category_id, 10),
    };
  
    return this.prisma.book.update({
      where: { id: bookId },
      data: updatedCategory,
    });
  }

  remove(id: number) {
    return this.prisma.book.delete({where: {id: id}});
  }
}

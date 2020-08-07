import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CreateCatDto } from './dto';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats2';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<string> {
    console.log(createCatDto);
    return 'This action adds a new cat';
  }
}

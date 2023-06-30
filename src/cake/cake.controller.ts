import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CakeService } from './cake.service';
import { CreateCakeDto } from './dto/create-cake.dto';
import { UpdateCakeDto } from './dto/update-cake.dto';
import { pageable } from '../common/type/pageable.type';
import { PaginateResult } from 'mongoose';
import { CakeResponseDto } from './dto/cake-response.dto';

@Controller('cakes')
export class CakeController {
  constructor(private readonly cakeService: CakeService) {}

  // @Post()
  // create(@Body() createCakeDto: CreateCakeDto) {
  //   return this.cakeService.create(createCakeDto);
  // }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() pageable: pageable,
  ): Promise<PaginateResult<CakeResponseDto>> {
    return await this.cakeService.findAll(pageable);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<CakeResponseDto> {
    return await this.cakeService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCakeDto: UpdateCakeDto) {
  //   return this.cakeService.update(id, updateCakeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cakeService.remove(id);
  // }
}

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
  Res,
} from '@nestjs/common';
import { CakeService } from './cake.service';
import { CreateCakeDto } from './dto/create-cake.dto';
import { CakeResponseDto } from './dto/cake-response.dto';
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ApiPaginatedResponse } from '../common/decorator/api-paginated-response.decorator';
import { PageableQuery } from '../common/query/pageable.query';

@Controller('cakes')
@ApiTags('cakes')
export class CakeController {
  constructor(private readonly cakeService: CakeService) {}

  @Post()
  create(@Body() createCakeDto: CreateCakeDto) {
    return this.cakeService.create(createCakeDto);
  }

  @Get()
  @ApiPaginatedResponse(CakeResponseDto)
  @ApiNoContentResponse({ description: '정보 없음.' })
  async findAll(
    @Query() pageable: PageableQuery,
    @Res() response: Response,
  ): Promise<Response> {
    const cakes = await this.cakeService.findAll(pageable);
    if (cakes.docs.length === 0) {
      return response.status(204).send();
    }
    return response.status(200).json(cakes);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: '케이크를 불러옵니다.',
    type: CakeResponseDto,
  })
  @ApiNotFoundResponse({ description: '케이크를 찾을 수 없습니다.' })
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

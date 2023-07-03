import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { CakeService } from './cake.service';
import { CreateCakeDto } from './dto/create-cake.dto';
import { CakeResponseDto } from './dto/cake-response.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ApiPaginatedResponse } from '../common/decorator/api-paginated-response.decorator';
import { PageableQuery } from '../common/query/pageable.query';
import { UpdateCakeDto } from './dto/update-cake.dto';

const cakeIdParams = {
  name: 'id',
  description: '케이크 ID(ObjectId)',
  required: true,
  type: String,
};

// TODO: 인증/인가 권한 추가하기
@Controller('cakes')
@ApiTags('cakes')
export class CakeController {
  constructor(private readonly cakeService: CakeService) {}

  @Post()
  @ApiOperation({
    summary: '케이크 생성',
    description: '케이크를 생성합니다.' + '\n\n' + 'Admin 권한이 필요합니다.',
  })
  @ApiCreatedResponse({
    description: '케이크 생성 성공',
    type: CakeResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'request body의 조건이 잘못됨.',
  })
  async create(@Body() createCakeDto: CreateCakeDto) {
    return await this.cakeService.create(createCakeDto);
  }

  @Get()
  @ApiOperation({
    summary: '케이크 목록 요청',
    description:
      '페이지네이션된 케이크 목록을 요청합니다.' +
      '\n\n' +
      '권한이 필요하지 않습니다.',
  })
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
  @ApiOperation({
    summary: '케이크 정보 요청',
    description:
      'ID를 이용하여 케이크 정보를 요청합니다.' +
      '\n\n' +
      '권한이 필요하지 않습니다.',
  })
  @ApiParam(cakeIdParams)
  @ApiOkResponse({
    description: '케이크 정보 요청 성공',
    type: CakeResponseDto,
  })
  @ApiNotFoundResponse({ description: '케이크를 찾을 수 없습니다.' })
  async findOne(@Param('id') id: string): Promise<CakeResponseDto> {
    return await this.cakeService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '케이크 정보 수정',
    description:
      'ID를 이용하여 케이크 정보를 수정합니다.' +
      '\n\n' +
      'Admin 권한이 필요합니다.',
  })
  @ApiParam(cakeIdParams)
  @ApiOkResponse({
    description: '케이크 정보 수정 성공',
    type: CakeResponseDto,
  })
  @ApiNotFoundResponse({ description: '케이크를 찾을 수 없습니다.' })
  async update(@Param('id') id: string, @Body() updateCakeDto: UpdateCakeDto) {
    return await this.cakeService.update(id, updateCakeDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '케이크 정보 삭제',
    description:
      'ID를 이용하여 케이크 정보를 삭제합니다.' +
      '\n\n' +
      'Admin 권한이 필요합니다.',
  })
  @ApiParam(cakeIdParams)
  @ApiOkResponse({
    description: '케이크 정보 삭제 성공',
  })
  @ApiNotFoundResponse({ description: '케이크를 찾을 수 없습니다.' })
  remove(@Param('id') id: string) {
    return this.cakeService.remove(id);
  }
}

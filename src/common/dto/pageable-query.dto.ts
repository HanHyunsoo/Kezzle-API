import { ApiProperty } from '@nestjs/swagger';

export class PageableQueryDto {
  @ApiProperty({ description: '현재 페이지 번호', example: 1, default: 1 })
  page: number;
  @ApiProperty({
    description: '한 페이지에 보여줄 결과 데이터의 개수',
    example: 10,
    default: 10,
  })
  size: number;
  @ApiProperty({
    description: '정렬 기준',
    example: ['createdAt', 'desc'],
    default: [],
  })
  sort: string[];
  constructor() {
    this.page = 1;
    this.size = 10;
    this.sort = [];
  }
}

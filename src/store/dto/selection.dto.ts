import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SelectionDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: '설명',
    example: '바닐라 제누와즈 & 버터크림 & 딸기쨈',
    required: true,
  })
  readonly description: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: '세부 설명',
    example:
      '카스테라빵에 딸기잼과 우유버터크림을 함께먹는 맛!' +
      '\n\n' +
      '가장기본적인 케이크 맛입니다!',
    required: false,
  })
  readonly subdescription?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: '가격',
    example: 30000,
    required: false,
  })
  readonly price?: number;
}

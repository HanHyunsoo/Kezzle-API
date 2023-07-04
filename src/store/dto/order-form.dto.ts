import { ApiProperty } from '@nestjs/swagger';
import { OrderFormType } from '../enum/order-form.enum';
import { SelectionDto } from './selection.dto';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class OrderFormDto {
  @IsEnum(OrderFormType)
  @ApiProperty({
    type: String,
    description: '주문 형태',
    example: OrderFormType.RADIO,
    enum: OrderFormType,
    required: true,
  })
  readonly type: OrderFormType;

  @IsString()
  @ApiProperty({
    type: String,
    description: '주문 형태 제목',
    example: '맛 선택',
    required: true,
  })
  readonly title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: '주문 형태 부제목',
    example: '맛을 선택해주세요',
    required: false,
  })
  readonly subTitle?: string;

  @IsOptional()
  @IsArray()
  @Type(() => SelectionDto)
  @ValidateNested({ each: true })
  @ApiProperty({
    type: [SelectionDto],
    description: '주문 형태 선택지들',
    required: false,
  })
  readonly selections?: SelectionDto[];
}

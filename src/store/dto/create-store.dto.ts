import { ApiProperty } from '@nestjs/swagger';
import { LocationDto } from './location.dto';
import { OrderFormDto } from './order-form.dto';
import {
  IsArray,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ImageRequestDto } from '../../upload/dto/image-request.dto';

export class CreateStoreDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: '가게 이름',
    example: '오슈가',
    required: true,
  })
  readonly name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: '리스트뷰에서 가게 설명',
    example:
      '초코 제누아즈: 가나슈필링 바닐라 제누아즈: 버터크림 + 딸기잼필링 당근케익(건포도 + 크렌베리 + 호두): 크림치즈 필링',
    required: false,
  })
  readonly listViewDescription?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: '가게 상세 설명',
    example:
      '본비케이크만의 무드를 담은 케이크로 소중한 날을 더욱 특별하게 만들어드려요 :)',
    required: false,
  })
  readonly detailDescription?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: '가게 탭뷰에서 설명',
    example: `안녕하세요~ 

저희매장은 소중한날 행복할 수 있도록 정성스럽게 
제작해드리겠습니다:)

공지사항
저희 케이크는 유화제 및 방부제를 사용하지 않습니다
(당일생산, 당일판매)
픽업 후 냉장보관필수, 실온 노출 1시간 미만 추천
(냉장시 2-3일 섭취가능 계절 및 상황이 다르므로 선택적 판단)
픽업후 실온 2-3시간이상 노출시 당일 섭취 권장드립니다

레터링 케이크의 제작은 
픽업 당일 약속시간에 맞춰서 준비됩니다
-너무 빨리 만들어놓는 경우 색번짐, 미세한 갈라짐, 
색변색등 있어 디자인은 미리해둘 수 없습니다!
픽업시간보다 일찍 오시는 경우는 디자인이 되어있지 
않는 경우 또는 되어있더라도 냉각이 덜 되어 가져가시면 
케이크의 디자인이 변형 가능성이 높습니다!
-너무 늦게오시면 쇼케이스에 공간이 부족,
다음 작업의 속도가 밀리게됩니다
조금 늦으시는 경우는 꼭 카톡으로 남겨주세요!

보냉패키지, 쇼핑백 판매x
이동시간등 걱정되시는 경우 개별 준비 `,
    required: false,
  })
  readonly tabViewDescription?: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty({
    type: String,
    description: '인스타그램 URL',
    example: 'https://www.instagram.com/example',
    required: false,
  })
  readonly instagramUrl?: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty({
    type: String,
    description: '카카오 URL',
    example: 'https://www.kakao.com/example',
    required: false,
  })
  readonly kakaoUrl?: string;

  @IsOptional()
  @Type(() => ImageRequestDto)
  @ValidateNested()
  @ApiProperty({
    type: ImageRequestDto,
    description: '가게 로고',
    required: false,
  })
  readonly logo?: ImageRequestDto;

  @IsOptional()
  @IsArray()
  @Type(() => ImageRequestDto)
  @ValidateNested({ each: true })
  @ApiProperty({
    type: [ImageRequestDto],
    description: '가게 관련 이미지들',
    required: false,
  })
  readonly detailImages?: ImageRequestDto[];

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: '가게 전화번호',
    example: '010-1234-5678',
    required: false,
  })
  readonly phoneNumber?: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: '가게 주소',
    example: '서울특별시 강남구 테헤란로 427',
    required: true,
  })
  readonly address: string;

  @Type(() => LocationDto)
  @ValidateNested()
  @ApiProperty({
    type: LocationDto,
    description: '가게 위치',
    required: true,
  })
  readonly location: LocationDto;

  @IsString()
  @ApiProperty({
    type: String,
    description: '사업자 등록번호',
    example: '123-45-67890',
    required: true,
  })
  readonly businessNumber: string;

  @IsOptional()
  @IsArray()
  @Type(() => OrderFormDto)
  @ValidateNested({ each: true })
  @ApiProperty({
    type: [OrderFormDto],
    description: '가게 주문서 컴포넌트들',
    required: false,
  })
  readonly orderForms?: OrderFormDto[];

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: '수정 권한을 가진 유저의 id',
    example: '6492ce59c2e9524c5d72d68a',
    required: true,
  })
  readonly owner: string;
}

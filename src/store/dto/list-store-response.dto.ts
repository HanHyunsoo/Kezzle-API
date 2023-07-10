import { ApiProperty } from '@nestjs/swagger';
import { LocationDto } from './location.dto';
import { ImageResponseDto } from '../../upload/dto/image-response.dto';

export class DetailStoreResponseDto {
  @ApiProperty({
    type: String,
    description: '가게 ID',
    example: '60b0f7b3f2b3a3f6b4e7b0b1',
    required: true,
  })
  readonly id: string;

  @ApiProperty({
    type: String,
    description: '가게 이름',
    example: '오슈가',
    required: true,
  })
  readonly name: string;

  @ApiProperty({
    type: String,
    description: '리스트뷰에서 가게 설명',
    example:
      '초코 제누아즈: 가나슈필링 바닐라 제누아즈: 버터크림 + 딸기잼필링 당근케익(건포도 + 크렌베리 + 호두): 크림치즈 필링',
    required: false,
  })
  readonly listViewDescription?: string;

  @ApiProperty({
    type: ImageResponseDto,
    description: '가게 로고',
    required: false,
  })
  readonly logo?: ImageResponseDto;

  @ApiProperty({
    type: [ImageResponseDto],
    description: '가게 관련 이미지들',
    required: false,
  })
  readonly detailImages?: ImageResponseDto[];

  @ApiProperty({
    type: String,
    description: '가게 주소',
    example: '서울특별시 강남구 테헤란로 427',
    required: true,
  })
  readonly address: string;

  @ApiProperty({
    type: LocationDto,
    description: '가게 위치',
    required: true,
  })
  readonly location: LocationDto;

  @ApiProperty({
    type: Number,
    description: '요청할때 보낸 위치와의 거리(미터 단위)',
    example: 120.0,
    required: true,
  })
  readonly distance: number;

  // TODO: 평점 추가해야함
  // @ApiProperty({
  // 	type: Number,
  // 	description: '평점',
  // 	example: 4.5,
  // 	required: false,
  // })
  // readonly rating?: number;

  // TODO: 로그인한 유저가 좋아요 눌렀는지에 대해 추가해야함
  // @ApiProperty({
  //   type: Boolean,
  //   description: '로그인한 유저가 좋아요 눌렀는지 여부',
  //   example: true,
  //   required: false,
  // })
  // readonly userLiked?: boolean;

  // TODO: 유저 좋아요 개수 추가해야함
  // @ApiProperty({
  // 	type: Number,
  // 	description: '유저 좋아요 개수',
  // 	example: 10,
  // 	required: false,
  // })
  // readonly userLikeCount?: number;

  // TODO: 리뷰 ID들 추가해야함
  // @ApiProperty({
  // 	type: [String],
  // 	description: '리뷰 ID들(ObjectId)',
  // 	example: ['60b9a9b9c9e3b1f9c8a3b1f9', '60b9a9b9c9e3b1f9c8a3b1f9'],
  // 	required: true,
  // })
  // readonly reviewIds: string[];

  @ApiProperty({
    type: Date,
    description: '가게 생성일',
    example: '2021-01-01T00:00:00.000Z',
    required: true,
  })
  readonly createdAt: Date;

  @ApiProperty({
    type: Date,
    description: '가게 수정일',
    example: '2021-01-01T00:00:00.000Z',
    required: true,
  })
  readonly updatedAt: Date;

  constructor(jsonData: any, distance = 0) {
    this.id = jsonData._id;
    this.name = jsonData.name;
    this.listViewDescription = jsonData.listViewDescription;
    this.logo = jsonData.logo;
    this.detailImages = jsonData.detailImages;
    this.address = jsonData.address;
    this.location = {
      latitude: jsonData.location.coordinates[1],
      longitude: jsonData.location.coordinates[0],
    };
    this.distance = distance;
    this.createdAt = jsonData.createdAt;
    this.updatedAt = jsonData.updatedAt;
  }
}

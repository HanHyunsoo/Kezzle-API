import { ApiProperty } from '@nestjs/swagger';
import { LocationDto } from './location.dto';
import { OrderFormDto } from './order-form.dto';
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
    type: String,
    description: '가게 상세 설명',
    example:
      '본비케이크만의 무드를 담은 케이크로 소중한 날을 더욱 특별하게 만들어드려요 :)',
    required: false,
  })
  readonly detailDescription?: string;

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

  @ApiProperty({
    type: String,
    description: '인스타그램 URL',
    example: 'https://www.instagram.com/example',
    required: false,
  })
  readonly instagramUrl?: string;

  @ApiProperty({
    type: String,
    description: '카카오 URL',
    example: 'https://www.kakao.com/example',
    required: false,
  })
  readonly kakaoUrl?: string;

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
    description: '가게 전화번호',
    example: '010-1234-5678',
    required: false,
  })
  readonly phoneNumber?: string;

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

  @ApiProperty({
    type: String,
    description: '사업자 등록번호',
    example: '123-45-67890',
    required: true,
  })
  readonly businessNumber: string;

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
    type: [OrderFormDto],
    description: '가게 주문서 컴포넌트들',
    required: false,
  })
  readonly orderForms?: OrderFormDto[];

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
    this.detailDescription = jsonData.detailDescription;
    this.tabViewDescription = jsonData.tabViewDescription;
    this.instagramUrl = jsonData.instagramUrl;
    this.kakaoUrl = jsonData.kakaoUrl;
    this.logo = jsonData.logo;
    this.detailImages = jsonData.detailImages;
    this.phoneNumber = jsonData.phoneNumber;
    this.address = jsonData.address;
    this.location = {
      latitude: jsonData.location.coordinates[1],
      longitude: jsonData.location.coordinates[0],
    };
    this.distance = distance;
    this.businessNumber = jsonData.businessNumber;
    this.orderForms = jsonData.orderForms;
    this.createdAt = jsonData.createdAt;
    this.updatedAt = jsonData.updatedAt;
  }
}

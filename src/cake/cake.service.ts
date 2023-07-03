import { Injectable } from '@nestjs/common';
import { CreateCakeDto } from './dto/create-cake.dto';
import { UpdateCakeDto } from './dto/update-cake.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';
import { cakeDocument } from './entities/cake.schema';
import { CakeResponseDto } from './dto/cake-response.dto';
import { CakeNotFoundException } from './exceptions/cake-not-found.exception';
import { PageableQuery } from '../common/query/pageable.query';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class CakeService {
  constructor(
    @InjectModel('Cake') private cakeModel: PaginateModel<cakeDocument>,
    private readonly uploadService: UploadService,
  ) {}

  async create(createCakeDto: CreateCakeDto): Promise<CakeResponseDto> {
    const cake = await this.cakeModel.create(createCakeDto);
    return new CakeResponseDto(cake);
  }

  async findAll(
    pageable: PageableQuery,
  ): Promise<PaginateResult<CakeResponseDto>> {
    const cakes = await this.cakeModel.paginate(
      {},
      {
        page: pageable.page,
        limit: pageable.size ? pageable.size : 10,
        sort: { createdAt: 1 },
        populate: 'orders',
      },
    );

    return {
      ...cakes,
      docs: cakes.docs.map((cake) => new CakeResponseDto(cake)),
    };
  }

  async findOne(id: string): Promise<CakeResponseDto> {
    const cake = await this.cakeModel.findOne({ _id: id }).catch(() => {
      throw new CakeNotFoundException(id);
    });

    return new CakeResponseDto(cake);
  }

  async update(
    id: string,
    updateCakeDto: UpdateCakeDto,
  ): Promise<CakeResponseDto> {
    const params = {
      tags: updateCakeDto.tags,
    };

    try {
      if (updateCakeDto.image !== undefined) {
        const cake = await this.cakeModel.findOne({ _id: id });
        await this.uploadService.remove(cake.image.s3Url);
        params['image'] = updateCakeDto.image;
      }

      const cake = await this.cakeModel
        .updateOne(
          { _id: id },
          {
            $set: params,
          },
        )
        .then(async () => {
          return await this.cakeModel.findOne({ _id: id });
        });

      return new CakeResponseDto(cake);
    } catch (e) {
      throw new CakeNotFoundException(id);
    }
  }

  async remove(id: string): Promise<void> {
    await this.cakeModel.deleteOne({ _id: id }).catch(() => {
      throw new CakeNotFoundException(id);
    });
  }
}

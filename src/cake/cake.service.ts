import { Injectable } from '@nestjs/common';
import { CreateCakeDto } from './dto/create-cake.dto';
import { UpdateCakeDto } from './dto/update-cake.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';
import { cakeDocument } from './entities/cake.schema';
import { CakeResponseDto } from './dto/cake-response.dto';
import { pageable } from '../common/type/pageable.type';
import { CakeNotFoundException } from './exceptions/cake-not-found.exception';

@Injectable()
export class CakeService {
  constructor(
    @InjectModel('Cake') private cakeModel: PaginateModel<cakeDocument>,
  ) {}

  async create(createCakeDto: CreateCakeDto): Promise<CakeResponseDto> {
    const cake = await this.cakeModel.create(createCakeDto);
    return new CakeResponseDto(cake);
  }

  async findAll(pageable: pageable): Promise<PaginateResult<CakeResponseDto>> {
    const cakes = await this.cakeModel.paginate(
      {},
      {
        page: pageable.page,
        limit: pageable.size ? pageable.size : 10,
        sort: { createdAt: -1 },
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
    const cake = await this.cakeModel
      .updateOne(
        { _id: id },
        {
          $set: updateCakeDto,
        },
      )
      .catch(() => {
        throw new CakeNotFoundException(id);
      });

    return new CakeResponseDto(cake);
  }

  async remove(id: string): Promise<void> {
    this.cakeModel.deleteOne({ _id: id }).catch(() => {
      throw new CakeNotFoundException(id);
    });
  }
}

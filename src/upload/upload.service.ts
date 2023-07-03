import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { randomUUID } from 'crypto';
import { S3UploadException } from './exceptions/s3-upload.exception';
import { ImageResponseDto } from './dto/image-response.dto';

@Injectable()
export class UploadService {
  private s3 = new S3();

  async create(
    parentDirectory: string,
    file: Express.Multer.File,
  ): Promise<ImageResponseDto> {
    const extension = file.originalname.split('.').pop();
    const convertedName = randomUUID() + '.' + extension;

    const params = {
      Bucket: process.env.A_BUCKET_NAME,
      Key: `${parentDirectory}/${convertedName}`,
      Body: file.buffer,
      ACL: 'public-read',
    };

    const data = await this.s3
      .upload(params)
      .promise()
      .catch(() => {
        throw new S3UploadException();
      });

    return new ImageResponseDto({
      originalName: file.originalname,
      convertedName: convertedName,
      s3Url: data.Location,
    });
  }

  async remove(s3Url: string): Promise<void> {
    const params = {
      Bucket: process.env.A_BUCKET_NAME,
      Key: s3Url
        .split(
          `https://${process.env.A_BUCKET_NAME}.s3.${process.env.A_REGION}.amazonaws.com/`,
        )
        .pop(),
    };

    await this.s3.deleteObject(params).promise();
  }
}

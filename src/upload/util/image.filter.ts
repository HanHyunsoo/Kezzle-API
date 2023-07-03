import { ParseFilePipeBuilder } from '@nestjs/common';

export const parseFilePipe = new ParseFilePipeBuilder()
  .addFileTypeValidator({ fileType: 'image/*' })
  .addMaxSizeValidator({ maxSize: 1024 * 1024 * 10 })
  .build();

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 } from 'uuid';

export class StorageObjectDto {
  @ApiProperty({ required: false })
  filename?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File;
}

@ApiTags('Files')
@Controller('Buckets')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('buckets')
  getBuckets() {
    return this.filesService.getBuckets();
  }

  @Get('objects/:bucket')
  getObjets(@Param('bucket') bucket: string) {
    return this.filesService.getObjects(bucket);
  }

  @Get('file/:filename')
  getFile(@Param('filename') filename: string) {
    return this.filesService.getFile(filename);
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Body() data: StorageObjectDto,

    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    const fileName =
      v4() + '.' + (data.filename || file.originalname).split('.').pop();

    return this.filesService
      .putObject('frankenstein', fileName, file.buffer)
      .then(() => fileName);
  }
}

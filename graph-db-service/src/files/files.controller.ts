import { Controller, Get, Param } from '@nestjs/common';
import { FilesService } from './files.service';
import { ApiTags } from '@nestjs/swagger';

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
  getFile(@Param('name') name: string) {
    return this.filesService.getFile(name);
  }
}

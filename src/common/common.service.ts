import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { join } from 'path';
import { OssService } from 'src/oss/oss.service';

@Injectable()
export class CommonService {
  constructor(private readonly ossService: OssService) {}

  async upload(file: Express.Multer.File) {
    try {
      return this.ossService.putOssFile(
        `/image/${file.filename}`,
        join(__dirname, `../image/${file.filename}`),
      );
    } catch (error) {
      throw new HttpException('Server Error', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async batchUpload(files: Express.Multer.File[]) {
    const queue = [];
    for (const file of files) {
      const promise = this.upload(file);
      queue.push(promise);
    }
    return await Promise.all(queue);
  }
}

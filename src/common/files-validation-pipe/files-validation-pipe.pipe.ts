import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  NotAcceptableException,
} from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class FilesValidationPipePipe implements PipeTransform {
  transform(value: Express.Multer.File[], metadata: ArgumentMetadata) {
    const format = /jpeg|png|jpg|webp/i;
    const maxSize = 5 * 1024 * 1024;
    for (const file of value) {
      const ext = extname(file.originalname);
      if (!format.test(ext)) {
        throw new NotAcceptableException('文件格式不正确！');
      }
      if (file.size > maxSize) {
        throw new NotAcceptableException('文件不能大于5M！');
      }
      return value;
    }
  }
}

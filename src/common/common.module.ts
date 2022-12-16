import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { OssService } from 'src/oss/oss.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../image'),
        filename: (_, file, cb) => {
          const fileName = `${
            new Date().getTime() + extname(file.originalname)
          }`;
          return cb(null, fileName);
        },
      }),
      // 这个地方取不到文件的size，所以将文件校验放到FilesValidationPipePipe中去了
      // fileFilter(req, file, cb) {
      //   const ext = extname(file.originalname);
      //   const format = /jpeg|png|jpg|webp/i;
      //   if (!format.test(ext)) {
      //     throw new NotAcceptableException();
      //   }
      //   console.log(file.size, '=====');
      //   console.log(req, 'req====');
      //   cb(null, true);
      // },
    }),
  ],
  controllers: [CommonController],
  providers: [CommonService, OssService],
})
export class CommonModule {}

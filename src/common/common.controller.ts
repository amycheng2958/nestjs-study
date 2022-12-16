import {
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CommonService } from './common.service';
import { FilesValidationPipePipe } from './files-validation-pipe/files-validation-pipe.pipe';

@UseGuards(AuthGuard('jwt'))
@Controller()
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(
    @UploadedFiles(new FilesValidationPipePipe())
    files: Array<Express.Multer.File>,
  ) {
    return await this.commonService.batchUpload(files);
  }
}

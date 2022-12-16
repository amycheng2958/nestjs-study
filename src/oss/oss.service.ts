import { Injectable } from '@nestjs/common';
import * as OSS from 'ali-oss';

@Injectable()
export class OssService {
  private client: any;
  constructor() {
    this.client = new OSS({
      region: 'oss-cn-hangzhou',
      accessKeyId: 'LTAI5tJpwPUhsKX7JHpWAc7k',
      accessKeySecret: 'txvCZQcEvztPB3fXicW5SdOclIShx3',
      bucket: 'example-cyy',
    });
  }
  async listBuckets() {
    try {
      // 列举当前账号所有地域下的存储空间。
      return await this.client.listBuckets();
    } catch (err) {
      console.log(err);
    }
  }
  async list() {
    // 不带任何参数，默认最多返回100个文件。
    return await this.client.list();
  }

  async putOssFile(ossPath: string, localpath: string) {
    const headers = {
      // 指定Object的存储类型。
      'x-oss-storage-class': 'Standard',
      // 指定Object的访问权限。
      'x-oss-object-acl': 'private',
      // 设置Object的标签，可同时设置多个标签。
      'x-oss-tagging': 'Tag1=1&Tag2=2',
      // 指定PutObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
      'x-oss-forbid-overwrite': 'true',
    };
    try {
      // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
      // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
      return await this.client.put(
        ossPath,
        localpath,
        // 自定义headers
        { headers },
      );
    } catch (e) {
      console.log(e);
    }
  }
}

import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';

@Injectable()
export class FilesService {
  private minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin',
  });

  async getBuckets() {
    let buckets = [];

    try {
      buckets = await this.minioClient.listBuckets();
      console.log('Success', buckets);
    } catch (err) {
      console.log(err.message);
    }

    return buckets;
  }

  async getFile(name: string) {
    let size = 0;
    const dataStream = await this.minioClient.getObject('frankenstein', name);

    dataStream.on('data', function (chunk) {
      size += chunk.length;
    });
    dataStream.on('end', function () {
      console.log('End. Total size = ' + size);
    });
    dataStream.on('error', function (err) {
      console.log(err);
    });
  }

  async getObjects(name: string) {
    const data = [];
    const dataStream = await this.minioClient.listObjects(name, '', true);

    const promise = new Promise((resolve, reject) => {
      dataStream.on('data', function (obj) {
        data.push(obj);
      });
      dataStream.on('end', function (obj) {
        console.log(data);
        resolve(data);
      });
      dataStream.on('error', function (err) {
        console.log(err);
        reject(err);
      });
    });

    return await promise;
  }
}

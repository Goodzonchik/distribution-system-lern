import { Injectable, StreamableFile } from '@nestjs/common';
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

  async getFile(filename: string) {
    const dataStream = await this.minioClient.getObject(
      'frankenstein',
      filename,
    );

    return new StreamableFile(dataStream);
  }

  async getObjects(name: string) {
    const data = [];
    const dataStream = await this.minioClient.listObjects(name, '', true);

    const promise = new Promise((resolve, reject) => {
      dataStream.on('data', function (obj) {
        data.push(obj);
      });
      dataStream.on('end', function (obj) {
        resolve(data);
      });
      dataStream.on('error', function (err) {
        reject(err);
      });
    });

    return await promise;
  }

  async putObject(bucketName, objectName, stream) {
    await this.minioClient.putObject(bucketName, objectName, stream);
  }
}

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { Client } from 'minio';

@Injectable()
export class FilesService {
  private minioClient: Client;

  constructor() {
    this.minioClient = new Client({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: 'youraccesskey',
      secretKey: 'yoursecretkey',
    });
  }

  // Function to create a bucket
  async createBucket(bucketName: string) {
    try {
      const exists = await this.minioClient.bucketExists(bucketName);
      if (!exists) {
        await this.minioClient.makeBucket(bucketName);
        console.log('Bucket created successfully.');
      } else {
        console.log('Bucket already exists.');
      }
    } catch (err) {
      console.error('Error creating bucket:', err);
    }
  }

  async uploadFile(file: Express.Multer.File) {
    try {
      const bucketName = 'my-bucket';
      const fileName = file.originalname;
      const contentType = file.mimetype;
      const fileStream = file.buffer;
      await this.createBucket(bucketName);
      await this.minioClient.putObject(bucketName, fileName, fileStream);
      console.log('File uploaded successfully.');
      return `File uploaded successfully: ${fileName}`;
    } catch (err) {
      console.error('Error uploading file:', err);
      throw new InternalServerErrorException('Error uploading file');
    }
  }

  async uploadMultipleFiles(files: Express.Multer.File[]) {
    try {
      const bucketName = 'my-bucket';
      await this.createBucket(bucketName);

      for (const file of files) {
        const fileName = file.originalname;
        const contentType = file.mimetype;
        const fileStream = file.buffer;

        await this.minioClient.putObject(bucketName, fileName, fileStream);
        console.log('File uploaded successfully.');
      }

      return `Files uploaded successfully: ${files.length} files`;
    } catch (err) {
      console.error('Error uploading files:', err);
      throw new InternalServerErrorException('Error uploading files');
    }
  }
}

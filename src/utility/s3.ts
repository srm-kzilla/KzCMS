import { PutObjectCommand, PutObjectRequest, S3Client } from '@aws-sdk/client-s3';
import config from '@/config';
import slugify from 'slugify';
import { createReadStream } from 'fs';

export const s3Client = new S3Client({
  region: config.AWS.region,
  credentials: {
    accessKeyId: config.AWS.clientKey,
    secretAccessKey: config.AWS.clientSecret,
  },
});

// const streamToBuffer = (stream: Readable): Promise<Buffer> => {
//   return new Promise((resolve, reject) => {
//     const chunks: Buffer[] = [];
//     stream.on('data', (chunk) => chunks.push(chunk));
//     stream.on('error', reject);
//     stream.on('end', () => resolve(Buffer.concat(chunks)));
//   });
// }

export async function uploadImage(slug: string, title: string, image: Express.Multer.File): Promise<string> {
  // TODO: Add Zod types later
  const KEY = slugify(`${slug} ${title}`, { lower: true, replacement: '-', trim: true });

  console.log(`${image.destination}${image.filename}`);

  const params: PutObjectRequest = {
    Bucket: config.AWS.bucketName,
    Key: KEY,
    Body: createReadStream(`${image.destination}${image.filename}`),
    ACL: 'public-read',
    ContentType: image.mimetype,
  };

  await s3Client.send(new PutObjectCommand(params));
  const url = `https://${config.AWS.bucketName}.s3.${config.AWS.region}.amazonaws.com/${KEY}`;

  return url;
}

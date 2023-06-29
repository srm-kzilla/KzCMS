import { S3Client } from '@aws-sdk/client-s3';
import config from '@/config';
import multerS3 from 'multer-s3';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

require('dotenv').config();

export const s3Client = new S3Client({
  region: config.AWS.region,
  credentials: {
    accessKeyId: config.AWS.clientKey,
    secretAccessKey: config.AWS.clientSecret,
  },
});

export const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: `${config.AWS.bucketName}`,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file: Express.Multer.File, cb: FileFilterCallback) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Unsupported file format'));
  }
}

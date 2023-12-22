import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';

export const upload = multer({
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  storage: multer.diskStorage({
    destination: function (_, __, cb) {
      const path = `./tmp/uploads/`;
      fs.mkdirSync(path, { recursive: true });
      return cb(null, path);
    },
  }),
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

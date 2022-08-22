import multer from 'multer';
import uploadConfig from '../../multer/multer';

export const upload = multer(uploadConfig.upload());
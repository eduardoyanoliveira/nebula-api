import crypto from 'crypto';
import multer from "multer";

import { extname, resolve } from 'path';

export default{
    upload(){
        return{
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..', 'src/assets/images'),
                filename: (request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString('hex');
                    const fileName = `${fileHash}-${file.originalname}`;

                    return callback(null, fileName);
                }
            })
        };
    }
};
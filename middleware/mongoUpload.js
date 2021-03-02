const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const GridfsStorage = require('multer-gridfs-storage');

const storage = new GridfsStorage({
    url: "mongodb://localhost:27017/socialweb",
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) =>{
                if(err){
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename,
                    bucketName: process.env.MONGO_BUCKET
                };
                resolve(fileInfo);
            });
        });
    }
})

const mongoUpload = multer({storage});
module.exports = mongoUpload;
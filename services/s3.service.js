const S3 = require('aws-sdk/clients/s3');
const path = require('path');
const uuid = require('uuid').v4;

const {
    S3_ACCESS_KEY, S3_REGION, S3_SECRET_KEY, S3_BUCKET_NAME
} = require('../constants');

const S3Bucket = new S3({
    region: S3_REGION,
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY
});

module.exports = {
    uploadFile: async (file, type) => {
        const { name, data, mimetype } = file;

        const fileUploadPath = buildS3Path(name, type);

        const response = await S3Bucket.upload({
            Bucket: S3_BUCKET_NAME,
            Body: data,
            ContentType: mimetype,
            Key: fileUploadPath
        }).promise();

        return response.Location;
    },
};


function buildS3Path(file, type) {
    const ext = path.extname(file);

    const filePath = path.join(`${type}/${uuid()}${ext}`).replace(/\\/g, '/');

    return filePath;
}

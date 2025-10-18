const { S3Client } = require("@aws-sdk/client-s3");
require("dotenv").config();

const s3Client = new S3Client({
  region: process.env.REGION_AWS3,
  credentials: {
    accessKeyId: process.env.KEY_AWS3,
    secretAccessKey: process.env.SERECT_AWS3,
  },
});

module.exports = s3Client;
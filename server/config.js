import { config } from 'dotenv';

config()

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    BUCKET_NAME: process.env.BUCKET_NAME,
    S3_ENPOINT: process.env.S3_ENPOINT,
}
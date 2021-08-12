//import aws from 'aws-sdk';
import config from '../config';
import { Router } from "express";
import { upload, s3 } from "../lib/multer";
import Image from "../models/image";
const router = Router();

const uploadFile = async (req, res) => {
  const newImage = new Image({
    url: req.file.location,
    key: req.file.key,
    title: req.body.title,
  });
  console.log(newImage);
  await newImage.save();
  // res.redirect('/files');
  res.json(newImage);
};

router.post("/api/images/upload", upload, uploadFile);

router.get("/api/images", async (req, res) => {
    const images = await Image.find();
    return res.json(images);
});

router.get("/api/images/:id", async (req, res) => {
    const image = await Image.findById(req.params.id);
    return res.json(image);
});

router.delete("/api/images/:id", async (req, res) => {
    const image = await Image.findByIdAndDelete(req.params.id);
  
    await s3.deleteObject({
        Bucket: config.BUCKET_NAME,
        Key: image.key
    }).promise();
    
    return res.json(image);
});

router.put("/api/images/:id",upload, async (req, res) => {
    const body = {
        url: req.file.location,
        title: req.body.title,
        key: req.file.key,
    }
    const image = await Image.findByIdAndUpdate(req.params.id, body, { new: true });
    return res.json(image);
});

export default router;

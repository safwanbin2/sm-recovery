import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import fs from "fs";

cloudinary.config({
  cloud_name: "ds1maiqpl",
  api_key: "738726652524346",
  api_secret: "bueVzEC4wJ6IIy4dahG7CpZU8RI",
});

export const sendImageToCloudinary = (imgURL: string) => {
  return new Promise((resolve, reject): any => {
    cloudinary.uploader.upload(
      imgURL,
      { public_id: "User_Photo" },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result);

        fs.unlink(imgURL, (err) => {
          if (err) {
            reject(err);
          }
          console.log(`File is deleted`);
        });
      }
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });

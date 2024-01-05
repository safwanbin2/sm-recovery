import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

export const sendImageToCloudinary = (imgURL: string) => {
  cloudinary.config({
    cloud_name: "ds1maiqpl",
    api_key: "738726652524346",
    api_secret: "bueVzEC4wJ6IIy4dahG7CpZU8RI",
  });

  cloudinary.uploader.upload(
    imgURL,
    { public_id: "olympic_flag" },
    function (error, result) {
      console.log(result);
    }
  );
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

import { v2 as cloudinary } from "cloudinary";

export const sendImageToCloudinary = () => {
  cloudinary.config({
    cloud_name: "ds1maiqpl",
    api_key: "738726652524346",
    api_secret: "bueVzEC4wJ6IIy4dahG7CpZU8RI",
  });

  cloudinary.uploader.upload(
    "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
    { public_id: "olympic_flag" },
    function (error, result) {
      console.log(result);
    }
  );
};

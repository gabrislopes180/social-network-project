import cloudinary from "../../config/cloudinary.js";

export async function uploadImage(path) {
  const result = await cloudinary.uploader.upload(path, {
    folder: "posts",
  });

  return result.secure_url;
}

const Products = require('../models/Product');
const path = require('path');
const { StatusCodes } = require('http-status-codes');
const customError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadProductImageLocal = async (req, res) => {
  // check if file exist
  if (!req.files) {
    throw new customError.BadRequestError('No file uploaded');
  }
  const productImage = req.files.image;
  // check file type

  if (!productImage.mimetype.startsWith('image')) {
    throw new customError.BadRequestError('Please upload an image');
  }
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new customError.BadRequestError(
      `Please upload image smaller than ${maxSize} byte`
    );
  }
  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + productImage.name
  );
  await productImage.mv(imagePath);
  res
    .status(StatusCodes.OK)
    .send({ image: { src: `/uploads/${productImage.name}` } });
};

const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'file-upload',
    }
  );

  // console.log(result);
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};
module.exports = { uploadProductImage };

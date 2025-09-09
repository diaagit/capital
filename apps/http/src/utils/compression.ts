// import express from 'express';
// import sharp from 'sharp';
// import multer from 'multer';
// import cors from 'cors';

// const app = express();
// const upload = multer();
// app.use(cors());

// // Async function for image compression
// const compressImage = async (buffer: Buffer): Promise<Buffer> => {
//   return await sharp(buffer)
//     .webp({ quality: 85, effort: 1, lossless: false })
//     .toBuffer();
// };

// app.post('/compress', upload.single('image'), async (req, res) => {
//   try {

//     const file = req.file as Express.Multer.File;

//     if (!file) {
//       return res.status(400).send('No file uploaded');
//     }

//     const compressed = await compressImage(file.buffer);
//     res.type('image/webp').send(compressed);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Compression failed');
//   }
// });

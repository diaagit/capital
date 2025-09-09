import { createClient } from "@supabase/supabase-js";
import express, { type Request, type Response, type Router } from "express";
import multer from "multer";
import sharp from "sharp";

const compressRouter: Router = express.Router();
const upload = multer(); // Initialize multer for file uploads

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const _supabase = createClient(supabaseUrl, supabaseKey);

// Async function for image compression
const compressImage = async (buffer: Buffer): Promise<Buffer> => {
    return await sharp(buffer)
        .webp({
            effort: 1,
            lossless: false,
            quality: 85,
        })
        .toBuffer();
};

compressRouter.post(
    "/compress",
    upload.single("image"), // Use multer middleware to handle file uploads
    async (req: Request, res: Response) => {
        try {
            const file = req.file as Express.Multer.File;

            if (!file) {
                return res.status(400).json({
                    error: "No file uploaded",
                });
            }

            const compressed = await compressImage(file.buffer);
            res.type("image/webp").send(compressed);
        } catch (error) {
            console.error("Internal error record", error);
            return res.status(500).json({
                error: "Internal error occurred",
                message: "Compression failed",
            });
        }
    },
);

export default compressRouter;

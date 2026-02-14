import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import stream from 'stream';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for memory storage
const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit for videos/docs
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|webp|pdf|mp4|doc|docx/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Format not supported (try images, pdf, mp4)'));
        }
    }
});

const uploadToCloudinary = (buffer: Buffer, folder: string, resourceType: 'image' | 'video' | 'raw' = 'image'): Promise<any> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder, resource_type: resourceType },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        const bufferStream = new stream.PassThrough();
        bufferStream.end(buffer);
        bufferStream.pipe(uploadStream);
    });
};

export const processPhotos = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.files || !(req.files as Express.Multer.File[]).length) return next();

    try {
        const files = req.files as Express.Multer.File[];
        const processedPhotos: any[] = [];
        const useCloudinary = process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET;

        const uploadDir = path.join(process.cwd(), 'uploads/profiles');
        const thumbDir = path.join(uploadDir, 'thumbnails');
        const watermarkDir = path.join(uploadDir, 'watermarked');

        if (!useCloudinary) {
            if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
            if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir, { recursive: true });
            if (!fs.existsSync(watermarkDir)) fs.mkdirSync(watermarkDir, { recursive: true });
        }

        for (const file of files) {
            const ext = path.extname(file.originalname).toLowerCase();
            const filename = `profile-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;

            if (file.mimetype.startsWith('image/')) {
                if (useCloudinary) {
                    // Upload to Cloudinary
                    // 1. Original
                    const originalUpload = await uploadToCloudinary(file.buffer, 'matrimonial/profiles');

                    // 2. Thumbnail (Cloudinary transformation)
                    // We can generate thumbnail URL from original public_id, but here strictly uploading separate if needed or just storing one.
                    // For simplicity, we use the original URL and front-end can use Cloudinary transformations. 
                    // But to match current schema, let's keep it simple.

                    processedPhotos.push({
                        url: originalUpload.secure_url,
                        thumbnailUrl: originalUpload.secure_url.replace('/upload/', '/upload/w_200,h_200,c_fill/'), // On-the-fly transformation
                        watermarkedUrl: originalUpload.secure_url.replace('/upload/', '/upload/l_text:Arial_24_bold:EQUALHEART.COM,o_30,g_center/'), // On-the-fly watermark
                        type: 'image',
                        publicId: originalUpload.public_id
                    });

                } else {
                    // Local Upload
                    const webpName = filename.replace(ext, '.webp');

                    // 1. Original (Converted to WebP)
                    await sharp(file.buffer)
                        .webp({ quality: 80 })
                        .toFile(path.join(uploadDir, webpName));

                    // 2. Thumbnail
                    await sharp(file.buffer)
                        .resize(200, 200, { fit: 'cover' })
                        .webp({ quality: 70 })
                        .toFile(path.join(thumbDir, webpName));

                    // 3. Watermark
                    const watermarkSvg = `
                        <svg width="400" height="100">
                            <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" opacity="0.3" text-anchor="middle">
                                EQUALHEART.COM
                            </text>
                        </svg>
                    `;

                    await sharp(file.buffer)
                        .composite([{ input: Buffer.from(watermarkSvg), gravity: 'center' }])
                        .webp({ quality: 80 })
                        .toFile(path.join(watermarkDir, webpName));

                    processedPhotos.push({
                        url: `/uploads/profiles/${webpName}`,
                        thumbnailUrl: `/uploads/profiles/thumbnails/${webpName}`,
                        watermarkedUrl: `/uploads/profiles/watermarked/${webpName}`,
                        type: 'image'
                    });
                }
            } else {
                // Document or Video
                if (useCloudinary) {
                    const uploadResult = await uploadToCloudinary(file.buffer, 'matrimonial/docs', file.mimetype.startsWith('video/') ? 'video' : 'raw');
                    processedPhotos.push({
                        url: uploadResult.secure_url,
                        type: file.mimetype.startsWith('video/') ? 'video' : 'document',
                        publicId: uploadResult.public_id
                    });
                } else {
                    fs.writeFileSync(path.join(uploadDir, filename), file.buffer);
                    processedPhotos.push({
                        url: `/uploads/profiles/${filename}`,
                        type: file.mimetype.startsWith('video/') ? 'video' : 'document'
                    });
                }
            }
        }

        (req as any).processedPhotos = processedPhotos;
        next();
    } catch (error) {
        next(error);
    }
};

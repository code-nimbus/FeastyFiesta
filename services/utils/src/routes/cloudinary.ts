// // // import express from "express";
// // // import cloudinary from "cloudinary";

// // // const router = express.Router()

// // // router.post("/upload", async (req, res) => {
// // //     try {
// // //         const { buffer } = req.body;
// // //         const cloud = await cloudinary.v2.uploader.upload(buffer)

// // //         res.json({
// // //             url: cloud.secure_url,
// // //         })
// // //     } catch (error: any) {
// // //         res.status(500).json({

// // //         })
// // //     }
// // // });

// // // export default router;

// // import { UploadApiResponse } from "cloudinary";
// // import express from "express";
// // import { v2 as cloudinary } from "cloudinary";
// // import fs from "fs";
// // import os from "os";
// // import path from "path";

// // const router = express.Router();

// // // router.post("/upload", async (req, res) => {
// // //     try {
// // //         const { buffer } = req.body;

// // //         const uploadFromBuffer = () =>
// // //             new Promise((resolve, reject) => {
// // //                 const stream = cloudinary.v2.uploader.upload_stream(
// // //                     { resource_type: "image", folder: "restaurants" },
// // //                     (error, result) => {
// // //                         if (error) return reject(error);
// // //                         resolve(result);
// // //                     }
// // //                 );

// // //                 streamifier.createReadStream(Buffer.from(buffer, "base64")).pipe(stream);
// // //             });

// // //         const result: any = await uploadFromBuffer();

// // //         res.json({ url: result.secure_url });

// // //     } catch (error: any) {
// // //         console.log("UPLOAD ERROR:", error);
// // //         res.status(500).json({ message: error.message });
// // //     }
// // // });

// // router.post("/upload", async (req, res) => {
// //     try {
// //         let { buffer } = req.body;

// //         // 🔥 REMOVE data:image/... prefix if it exists
// //         if (buffer.startsWith("data:")) {
// //             buffer = buffer.split(",")[1];
// //         }

// //         const streamifier = (await import("streamifier")).default;
// //         console.log(buffer?.slice(0, 50));
// //         console.log(buffer?.length);

// //         // const result = await new Promise<UploadApiResponse>((resolve, reject) => {
// //         //     const stream = cloudinary.uploader.upload_stream(
// //         //         { resource_type: "image", folder: "restaurants" },
// //         //         (error, result) => {
// //         //             if (error) {
// //         //                 console.log("CLOUDINARY REAL ERROR:", error);
// //         //                 return reject(error);
// //         //             }
// //         //             resolve(result as UploadApiResponse);
// //         //         }
// //         //     );

// //         //     streamifier
// //         //         .createReadStream(Buffer.from(buffer, "base64"))
// //         //         .pipe(stream);
// //         // });
// //         // const result = await cloudinary.uploader.upload(
// //         //     `data:image/jpeg;base64,${buffer}`,
// //         //     { folder: "restaurants" }
// //         // );

// //         const result = await cloudinary.uploader.upload(
// //             buffer,
// //             {
// //                 folder: "restaurants",
// //                 resource_type: "image"
// //             }
// //         );
// //         res.json({ url: result.secure_url });

// //     } catch (error: any) {
// //         console.log("UPLOAD ERROR:", error);
// //         res.status(500).json({
// //             message: error.message,
// //         });
// //     }
// // });

// // export default router;
// import streamifier from "streamifier";
// import express from "express";
// import { v2 as cloudinary } from "cloudinary";

// const router = express.Router();

// // router.post("/upload", async (req, res) => {
// //     try {
// //         let { buffer } = req.body;

// //         if (!buffer) {
// //             return res.status(400).json({ message: "No image provided" });
// //         }

// //         console.log(typeof buffer);
// //         console.log(buffer.length);

// //         // remove prefix if exists
// //         if (buffer.startsWith("data:")) {
// //             buffer = buffer.split(",")[1];
// //         }

// //         const result = await new Promise((resolve, reject) => {
// //             const stream = cloudinary.uploader.upload_stream(
// //                 { folder: "restaurants" },
// //                 (error, result) => {
// //                     if (error) return reject(error);
// //                     resolve(result);
// //                 }
// //             );

// //             streamifier
// //                 .createReadStream(Buffer.from(buffer, "base64"))
// //                 .pipe(stream);
// //         });

// //         res.json({ url: (result as any).secure_url });

// //     } catch (err: any) {
// //         console.log("UPLOAD ERROR:", err);
// //         res.status(500).json({ message: err.message });
// //     }
// // });

// // router.post("/upload", async (req, res) => {
// //     try {
// //         let { buffer } = req.body;

// //         if (!buffer) {
// //             return res.status(400).json({ message: "No image provided" });
// //         }

// //         // ONLY ensure clean base64
// //         if (buffer.includes(",")) {
// //             buffer = buffer.split(",")[1];
// //         }

// //         const result = await cloudinary.uploader.upload(
// //             `data:image/jpeg;base64,${buffer}`,
// //             {
// //                 folder: "restaurants",
// //                 resource_type: "image",
// //             }
// //         );

// //         return res.json({ url: result.secure_url });

// //     } catch (err: any) {
// //         console.log("UPLOAD ERROR:", err);
// //         return res.status(500).json({ message: err.message });
// //     }
// // });

// // router.post("/upload", async (req, res) => {
// //     try {
// //         const { buffer } = req.body;

// //         if (!buffer) {
// //             return res.status(400).json({ message: "No image provided" });
// //         }

// //         const result = await cloudinary.uploader.upload(buffer, {
// //             folder: "restaurants",
// //             resource_type: "image",
// //         });

// //         return res.json({ url: result.secure_url });

// //     } catch (err: any) {
// //         console.log("UPLOAD ERROR:", err);
// //         return res.status(500).json({ message: err.message });
// //     }
// // });

// router.post("/upload", async (req, res) => {
//     try {
//         const { buffer } = req.body;

//         if (!buffer) {
//             return res.status(400).json({ message: "No image provided" });
//         }

//         const streamifier = (await import("streamifier")).default;

//         const uploadResult = await new Promise((resolve, reject) => {
//             const stream = cloudinary.uploader.upload_stream(
//                 {
//                     folder: "restaurants",
//                     resource_type: "image",
//                 },
//                 (error, result) => {
//                     if (error) return reject(error);
//                     resolve(result);
//                 }
//             );

//             streamifier
//                 .createReadStream(Buffer.from(buffer, "base64"))
//                 .pipe(stream);
//         });

//         return res.json({ url: (uploadResult as any).secure_url });

//     } catch (err: any) {
//         console.log("UPLOAD ERROR:", err);
//         return res.status(500).json({ message: err.message });
//     }
// });

// export default router;

import streamifier from "streamifier";
import express from "express";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

router.post("/upload", async (req, res) => {
    console.log("UPLOAD HIT");
    try {
        const { buffer } = req.body;

        if (!buffer) {
            return res.status(400).json({ message: "No image provided" });
        }

        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "restaurants",
                    resource_type: "image",
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );

            streamifier
                .createReadStream(Buffer.from(buffer, "base64"))
                .pipe(stream);
        });

        return res.json({ url: (result as any).secure_url });

    } catch (err: any) {
        console.log("UPLOAD ERROR:", err);
        return res.status(500).json({ message: err.message });
    }
});

export default router;
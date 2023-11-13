import express from "express";
import cloudinary from "cloudinary";
import multer from 'multer';
import dotenv from "dotenv";
import SideBannerImage from "../Model/sidebanner.js";
dotenv.config();


//  initilizing the routes
const router = express.Router();

// cloudinary
cloudinary.config({
    cloud_name: process.env.Cloudinary_name,
    api_key: process.env.Cloudinary_API_Key,
    api_secret: process.env.Cloudinary_API_Secret_Key,
});
//  storage 
const Storage = multer.diskStorage({
    destination: 'Assets',
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
})

const upload = multer({
    storage: Storage
}).single('fileInputFieldName')


router.get("/side-banner-all", async (req, res) => {

    try {
        const allImages = await SideBannerImage.find();
        res.status(200).json({ images: allImages });
    }
    catch (error) {
        console.error("Error fetching all images:", error);
        res.status(500).json({ message: "Internal server error on your request" });
    }
})

router.get("/all/:id", async (req, res) => {

    try {
        const { id } = req.params;

        const image = await SideBannerImage.findById(id);
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }
        res.status(200).json({ Data: image });
    }
    catch (error) {
        console.error("Error fetching all images:", error);
        res.status(500).json({ message: "Internal server error on your request" });
    }
})

router.get("/edit/:id", async (req, res) => {

    try {
        const { id } = req.params;

        const updatedImage = await SideBannerImage.findById(id);
        if (!updatedImage) {
            return res.status(404).json({ message: "Image not found" });
        }
        res.status(200).json({ Data: updatedImage });
    }
    catch (error) {
        console.error("Error fetching all images:", error);
        res.status(500).json({ message: "Internal server error on your request" });
    }
})

router.post("/sidebanner-add", upload, async (req, res) => {
    try {
        // Import the Cloudinary configuration
        const { path } = req.file;
        const result = await cloudinary.v2.uploader.upload(path);

        //  new document in Mongoose model with the Cloudinary URL
        const newImage = new SideBannerImage({
            name: req.body.name,
            imageUrl: result.secure_url, // Store the Cloudinary URL

        });
        const savedImage = await newImage.save()
        if (!savedImage) {
            return res.status(400).json({ message: "Cannot post image" })
        }
        res.status(200).json({ message: "Image Uploaded Successfully", imageUrl: result.secure_url })
    }

    catch (error) {
        console.log("Error uploading Image:", error);
        res.status(500).json({ message: "Internal server error on your request" })
    }

});

router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletedImage = await SideBannerImage.findByIdAndDelete(id);
        if (!deletedImage) {
            return res.status(404).json({ message: "Image not found", deletedImage: null });
        }
        res.status(200).json({ message: "Image deleted successfully", deletedImage });

    } catch (error) {
        console.log("Error deleting image:", error);
        res.status(500).json({ message: "Internal server error on your request" })
    }
})

export const sideImageRouter = router;

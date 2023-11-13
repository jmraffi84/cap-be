import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    name: String,
    imageUrl: String // Store the Cloudinary URL here
});

const BannerImage = mongoose.model('BannerImage', bannerSchema);

export default BannerImage;

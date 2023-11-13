import mongoose from "mongoose";

const sideBannerSchema = new mongoose.Schema({
    name: String,
    imageUrl: String // Store the Cloudinary URL here
});

const SideBannerImage = mongoose.model('SideBannerImage', sideBannerSchema);

export default SideBannerImage;

const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Helper function to upload image
const uploadImage = async (filePath, folder = 'ecommerce') => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folder,
            resource_type: 'auto'
        });
        return result;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error('Image upload failed');
    }
};

// Helper function to delete image
const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        throw new Error('Image deletion failed');
    }
};

// Extract public ID from Cloudinary URL
const extractPublicId = (url) => {
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];
    const publicId = lastPart.split('.')[0];
    const folder = parts[parts.length - 2];
    return `${folder}/${publicId}`;
};

module.exports = {
    cloudinary,
    uploadImage,
    deleteImage,
    extractPublicId
};

import { v2 as cloudinaryV2 } from "cloudinary";

cloudinaryV2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

console.log(cloudinaryV2);

const cloudinary = cloudinaryV2

cloudinary.config({
    secure: true,
})

console.log(cloudinary);


const uploadImage = async (imagePath: string) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    }

    try {
        const result = await cloudinary.uploader.upload(imagePath, options)

        console.log(result)
        return result.public_id
    } catch (error) {
        console.error(error)
    }

}

export { uploadImage }
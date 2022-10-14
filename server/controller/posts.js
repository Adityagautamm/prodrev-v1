
import PostModel from "../models/postModel.js";

export const getPosts = async (req, res) => {
    console.log('inside post')
    try {
        const posts = await PostModel.find();
        for (const object of posts) {
            if (object.selectedFiles) {
                object.selectedFiles = process.env.ImageUrl + object.selectedFiles;
            }
        }

        res.status(200).json({
            data: posts
        })
    }

    catch (error) {
        res.status(404).json({ error })
        console.log(JSON.stringify(error))
    }
}


export const createPosts = async (req, res) => {

    const { title,
        description,
        location,
        tags,
        selectedFiles,
        createdAt, } = JSON.parse(req.body.post);

    const uploadeddata = new PostModel({
        title,
        description,
        location,
        tags,
        selectedFiles,
        createdAt,
    })

    try {
        await uploadeddata.save();
        //res.status(201).json(uploadeddata);
        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
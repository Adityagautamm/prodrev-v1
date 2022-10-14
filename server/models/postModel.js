import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    description: String,
    location: String,
    tags: [String],
    selectedFiles: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostModel = mongoose.model('PostModel', postSchema);

export default PostModel;
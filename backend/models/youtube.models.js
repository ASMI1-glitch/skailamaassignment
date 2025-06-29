import mongoose from "mongoose";

const youtubeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    transcript: {
        type: String,
        required: true,
        minLength: [6,"Transcript must be at least 6 Character long"],
        
    }
},{
    timestamps:true,
})

const Youtube = mongoose.model("Youtube",youtubeSchema);

export default Youtube;
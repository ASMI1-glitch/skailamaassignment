import Youtube from "../models/youtube.models.js";

export const youtubeController = async (req, res) => {
  try {
    const { name, transcript } = req.body;

    if (!name || !transcript) {
      return res
        .status(400)
        .json({ message: "Name and transcript are required" });
    }

    const newEntry = new Youtube({name,transcript});
    await newEntry.save()
    res.status(201).json({ message: "YouTube entry created successfully", entry: newEntry });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllYoutube = async(req,res) =>{
    try {
        const youtubeEntries = await Youtube.find();
        res.status(200).json(youtubeEntries);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}
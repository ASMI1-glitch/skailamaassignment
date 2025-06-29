import { Router } from "express";
import auth from "../middleware/auth.js";
import { youtubeController,getAllYoutube } from "../controllers/youtube.controllers.js";
const router = Router();

router.post("/create",auth,youtubeController)
router.get("/all",auth,getAllYoutube)


export default router;
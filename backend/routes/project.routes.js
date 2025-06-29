import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
import { createProject,getAllProject } from "../controllers/project.controllers.js";
const router = Router();

router.post("/create",authMiddleware,createProject)
router.get("/all",authMiddleware,getAllProject)

export default router;
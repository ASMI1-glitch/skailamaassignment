import dotenv from "dotenv"
import cors from 'cors'
import express from "express"
import connect from "./db/config.js"
import authRoutes from "./routes/auth.routes.js"
import projectRoutes from "./routes/project.routes.js"
import youtubeRoutes from './routes/youtube.routes.js'

dotenv.config()

const port = process.env.PORT

const app = express()

app.use(cors({
    origin: "https://skailamaassignment-r38l-9ruix26xf-asmi-prasads-projects.vercel.app",
    credentials: true
}));

app.use(express.json())

app.use('/api',authRoutes)
app.use("/api/projects", projectRoutes);
app.use("/api/youtube", youtubeRoutes);

app.listen(port || 8000,()=>{
    connect()
    console.log(`Server is Running on Port: ${port}`)
})

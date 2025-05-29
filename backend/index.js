import express from "express"
import studentRoutes from "./routes/studentRoutes.js"
import dotenv from "dotenv"
import cors from "cors"
import { connectToDatabase } from "./lib/db.js"

const app = express()
dotenv.config()
const PORT = process.env.PORT || 5000
app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json())

app.use("/api/student", studentRoutes)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

connectToDatabase()
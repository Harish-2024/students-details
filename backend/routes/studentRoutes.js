import express from "express"
import  studentController from "../controllers/studentController.js"

const router = express.Router()

router.post("/add-student", studentController.addStudent)

router.put("/update-student/:id", studentController.updateStudent)

router.get("/all-student", studentController.getStudents)

router.get("/:id", studentController.getStudent)

router.delete("/:id", studentController.deleteStudent)

export default router
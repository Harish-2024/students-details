import { Student } from "../models/studentModel.js"

const addStudent = async (req, res) => {
    const { name, email, age = null, parentid = null } = req.body

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' })
    }

    try {
        const existingStudent = await Student.findOne({ where: { email } })
        if (existingStudent) {
            return res.status(409).json({ error: 'Email already exists' })
        }

        await Student.create({ name, email, age, parentid })
        res.status(201).json({ message: 'Student added successfully' })
    } catch (error) {
        console.error('Error adding student:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

const updateStudent = async (req, res) => {
    const { id } = req.params
    const { name, email, age, parentid } = req.body

    try {
        const [updated] = await Student.update(
            { name, email, age, parentid },
            { where: { id } }
        )

        if (updated) {
            res.status(200).json({ message: 'Student updated successfully' })
        } else {
            res.status(404).json({ error: 'Student not found' })
        }
    } catch (error) {
        console.error('Error updating student:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

const getStudents = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const offset = (page - 1) * limit

        const { rows: students, count: totalCount } = await Student.findAndCountAll({
            offset,
            limit,
            order: [['id', 'ASC']],
        })

        res.status(200).json({
            students,
            totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
        })
    } catch (error) {
        console.error('Error fetching students:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

const getStudent = async (req, res) => {
    const { id } = req.params

    try {
        const student = await Student.findByPk(id)
        if (!student) {
            return res.status(404).json({ error: 'Student not found' })
        }
        res.status(200).json(student)
    } catch (error) {
        console.error('Error fetching student:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

const deleteStudent = async (req, res) => {
    const { id } = req.params

    try {
        const deleted = await Student.destroy({ where: { id } })
        if (deleted) {
            res.status(200).json({ message: 'Student deleted successfully' })
        } else {
            res.status(404).json({ error: 'Student not found' })
        }
    } catch (error) {
        console.error('Error deleting student:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

export default {
    addStudent,
    updateStudent,
    getStudents,
    getStudent,
    deleteStudent,
}

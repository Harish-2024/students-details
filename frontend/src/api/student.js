import apiClient from "../utils/apiClient"

export const getStudents = async ({ page, limit }) => {
    try {
        const response = await apiClient.get('/student/all-student', {
            params: { page, limit },
        })
        return response.data
    } catch (error) {
        console.error('Error fetching students:', error)
        throw error
    }
}

export const getStudent = async (id) => {
    try {
        const response = await apiClient.get(`/student/${id}`)
        return response.data
    } catch (error) {
        console.error('Error fetching student:', error)
        throw error
    }
}

export const addStudent = async (studentData) => {
    try {
        const response = await apiClient.post('/student/add-student', studentData)
        return response.data
    } catch (error) {
        console.error('Error adding student:', error)
        throw error
    }
}

export const updateStudent = async (id, studentData) => {
    try {
        const response = await apiClient.put(`/student/update-student/${id}`, studentData)
        return response.data
    } catch (error) {
        console.error('Error updating student:', error)
        throw error
    }
}

export const deleteStudent = async (id) => {
    try {
        const response = await apiClient.delete(`/student/${id}`)
        return response.data
    } catch (error) {
        console.error('Error deleting student:', error)
        throw error
    }
}

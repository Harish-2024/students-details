import { useEffect, useState } from 'react'
import { Table, Button, Form, message } from 'antd'
import { getStudents, addStudent, updateStudent, deleteStudent } from '../api/student'
import ConfirmationModal from './confirmationModal'
import UserModal from './userModal'

const StudentTable = () => {
  const [students, setStudents] = useState([])
  const [pagination, setPagination] = useState({ current: 1, pageSize: 2, total: 0 })
  const [loading, setLoading] = useState(false)
  const [formVisible, setFormVisible] = useState(false)
  const [form] = Form.useForm()
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const fetchStudents = async (page = pagination.current, pageSize = pagination.pageSize) => {
    setLoading(true)
    try {
      const res = await getStudents({ page, limit: pageSize })
      setStudents(res.students)
      setPagination({
        current: page,
        pageSize,
        total: parseInt(res.totalCount),
      })
    } catch (err) {
      console.error('Failed to fetch students:', err)
      message.error('Failed to load students')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (student) => {
    setSelectedStudent(student)
    setIsModalVisible(true)
  }

  const confirmDelete = async () => {
    try {
      if (selectedStudent.id) {
        const response = await deleteStudent(selectedStudent.id)
        message.success(response.message)
        setIsModalVisible(false)
        fetchStudents(1, pagination.pageSize)
      }
    } catch (err) {
      console.error('Failed to delete student:', err)
      message.error('Failed to delete student')
    }
  }

  const handleView = async (student) => {
    setSelectedStudent(student)
    form.setFieldsValue(student)
    setFormVisible(true)
  }

  const handlePageChange = (page, pageSize) => {
    fetchStudents(page, pageSize)
  }

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields()
      if (selectedStudent) {
        console.log('Updating student:', selectedStudent.id, values)
        const response = await updateStudent(selectedStudent.id, values)
        message.success(response.message)
      } else {
        const response = await addStudent(values)
        message.success(response.message)
      }
      setFormVisible(false)
      fetchStudents(pagination.current, pagination.pageSize)
    } catch (err) {
      console.error('Form submit error:', err)
      message.error('Failed to submit form')
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const columns = [
    {
      title: 'Serial No',
      render: (_, __, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    { title: 'ID', dataIndex: 'id' },
    { title: 'Student Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Age', dataIndex: 'age' },
    {
      title: 'Action',
      render: (_, record) => (
        <>
          <Button size="small" type="link" onClick={() => handleView(record)}>
            View
          </Button>
          <Button
            size="small"
            type="link"
            danger
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ]

  return (
    <div className="p-4">
      <div className="mb-2 text-right">
        <Button
          type="primary"
          onClick={() => {
            setSelectedStudent(null)
            form.resetFields()
            setFormVisible(true)
          }}
        >
          Add Student
        </Button>
      </div>
      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={students}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          pageSizeOptions: ['2', '5', '10', '20'],
          onChange: handlePageChange,
          onShowSizeChange: handlePageChange,
        }}
      />
      <UserModal
        visible={formVisible}
        selectedUser={selectedStudent}
        onSubmit={handleFormSubmit}
        onCancel={() => setFormVisible(false)}
        form={form}
      />

      <ConfirmationModal
        visible={isModalVisible}
        title="Are you sure you want to delete this student?"
        content="This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setIsModalVisible(false)}
      />
    </div>
  )
}

export default StudentTable

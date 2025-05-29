import React, { useEffect } from 'react'
import { Modal, Input, InputNumber, Form } from 'antd'

const UserModal = ({ visible, selectedUser, onSubmit, onCancel, form }) => {
    useEffect(() => {
        if (selectedUser) {
            form.setFieldsValue(selectedUser)
        } else {
            form.resetFields()
        }
    }, [selectedUser, form])

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields()
            onSubmit(values)
        } catch (err) {
            console.error('Validation failed:', err)
        }
    }

    return (
        <Modal
            title={selectedUser ? 'Edit User' : 'Add User'}
            open={visible}
            onCancel={onCancel}
            onOk={handleSubmit}
            okText={selectedUser ? 'Update' : 'Add'}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="Student Name"
                    rules={[{ required: true, message: 'Please enter student name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Please enter email' },
                        { type: 'email', message: 'Invalid email' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="age" label="Age">
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="parentid" label="Parent ID">
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default UserModal

import { Modal } from 'antd'

const ConfirmationModal = ({ visible, title, content, onConfirm, onCancel }) => {
  return (
    <Modal
      title={title}
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Yes"
      cancelText="No"
    >
      <p>{content}</p>
    </Modal>
  )
}

export default ConfirmationModal

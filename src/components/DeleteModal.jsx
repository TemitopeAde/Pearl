import Modal from 'react-bootstrap/Modal';



const DeleteModal = ({ open, setOpen }) => {
  console.log(open, "show");

  return (
    <>
      <Modal
        size="sm"
        show={open}
        onHide={() => setOpen(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>
          <h3>Are you sure?</h3>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteModal;
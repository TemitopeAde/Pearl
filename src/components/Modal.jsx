import CartContainer from '../pages/CartContainer';
import Modal from 'react-bootstrap/Modal';



const ModalContainer = ({ open, setOpen }) =>{
  console.log(open, "show");

  return (
    <>
      <Modal
        size="xl"
        show={open}
        onHide={() => setOpen(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Shopping Cart
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CartContainer />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalContainer;
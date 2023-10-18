import React from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';


const PayButton = ({ cartItems }) => {

  const checkoutMutation = useMutation(
    (cartItems) =>
      axios.post("http://127.0.0.1:5100/api/v1/users/checkout", { cartItems }),
    {
      onSuccess: (data) => {
        if (data.data.url) {
          window.location.href = data.data.url;
        }
      },
      onError: (error) => {
        // You can handle errors here, e.g., show an error message.
        console.error('Mutation error:', error.response.data.message);
        const notify = () => toast(`${error.response.data.message}`);
        notify();

      },
    }
  );

  const handlePay = (e) => {
    e.preventDefault();
    checkoutMutation.mutate(cartItems);
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div>
        <form>
          <button onClick={handlePay} type="submit" disabled={checkoutMutation.isLoading}>
            {checkoutMutation.isLoading ? 'Loading...' : 'Checkout'}
          </button>
        </form>
      </div>
    </>

  );
};

export default PayButton;

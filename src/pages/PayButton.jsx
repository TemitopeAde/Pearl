import axios from 'axios';
import React from 'react'

const PayButton = ({ cartItems }) => {
  console.log(cartItems, "cart");

  const handlePay = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://127.0.0.1:5100/api/v1/users/checkout", {
      cartItems
    });


    console.log(res.data.url);
  }
  return (
    <div>
      <form>
        <button onClick={handlePay} type="submit">Checkout</button>
      </form>
    </div>
  )
}

export default PayButton
import axios from 'axios';
import React from 'react'

const PayButton = ({ cartItems }) => {
  console.log(cartItems, "cart");

  const handlePay = async (e) => {
    e.preventDefault();
    const res = await axios.post("https://backend-5kyc.onrender.com/api/v1/users/checkout", {
      cartItems
    });

    if (res.data.url) {
      window.location.href = res.data.url
    }

    console.log(res);

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
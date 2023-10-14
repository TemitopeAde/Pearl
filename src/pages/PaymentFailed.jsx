import React from 'react'
import Header from '../components/Header'
import { Button } from 'react-bootstrap'
import Footer from '../components/Footer'
import { ToastContainer } from 'react-toastify'
import Transitions from '../constants/Transition'
import { useNavigate } from 'react-router-dom'

const PaymentFailed = () => {
  const navigate = useNavigate();
  return (
    <Transitions>
      <div className="authForm">
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
        <Header />
        <div className="login-box">
          <h2>Payment Failed</h2>

          <div className='back-div'>
            <button className='back-btn' onClick={() => navigate("/")}>Back to products</button>
          </div>
        </div>
        <Footer />
      </div>
    </Transitions>
  )
}

export default PaymentFailed
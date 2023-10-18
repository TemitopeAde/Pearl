import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux';
import './pages.css'
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { login, sendResetPasswordToken } from "../state/actions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../components/Footer"
import Transitions from '../constants/Transition'

import Header from '../components/Header'

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("")
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const loginMutation = useMutation((data) => dispatch(sendResetPasswordToken(data)), {
    onMutate: () => {
      setLoading(true); // Set loading state to true before the mutation starts
    },

    onSuccess: (data) => {
      // console.log(data);
      setLoading(false); 
      setEmail("")   
      const notify = () => toast(`${data.message}`);
      notify();  
    },

    // Use onError callback to handle errors
    onError: (err) => {
      // console.log(err);
      setLoading(false); // Set loading state to false after an error
      const notify = () => toast("User does not exist, email not sent");
      notify();
    },
  })


  const onSubmit = async (data) => {
    loginMutation.mutate(data);
  };

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
          <h2>Reset Password</h2>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="user-box">
              <input
                type="email" {...register("email", { required: true })}
                className='form-control'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span>This field is required</span>}
            </div>
            

            <button type="submit" id="submit-login" className='button-1' disabled={loading}>
              {loading ? 'Reset Password ...' : 'Reset Password'}
            </button>
          </form>
          <span style={{ display: "flex", margin: "2rem 0", color: "#fff", paddingBottom: "1rem" }}>
            <span className="txt1">
              Already a member?
            </span>
            <Link style={{ color: "green", cursor: "pointer", textDecoration: "none" }} to="/sign-in" className="txt1 bo1 hov1" href="#">
              Sign in now
            </Link>
          </span>

        </div>
        <Footer />
      </div>
    </Transitions>
  )
};

export default ResetPassword;

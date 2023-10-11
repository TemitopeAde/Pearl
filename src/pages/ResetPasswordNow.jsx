import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux';
import './pages.css'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { sendResetPasswordConfirm } from "../state/actions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../components/Footer"
import Transitions from '../constants/Transition'

import Header from '../components/Header'

const ResetPasswordNow = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {

  }, [])

  const resetMutation = useMutation((data) => dispatch(sendResetPasswordConfirm(data)), {
    onMutate: () => {
      setLoading(true);
    },

    onSuccess: () => {
      setLoading(false); 
      // navigate("/sign-in")
      const notify = () => toast("Successful");
      notify();
    },

    
    onError: () => {
      setLoading(false); 
      const notify = () => toast("Error");
      notify();
    },
  })

  const onSubmit = async (data) => {
    
    const tokenPassword = {
      newPassword: data.password,
      token: token
    }

    if (tokenPassword.newPassword === confirmPassword) {
      console.log(tokenPassword);
      resetMutation.mutate(tokenPassword);
    } else {
      const notify = () => toast("Passwords do not match");
      notify();
    }
    

  };

  console.log(errors);

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
                type="password" {...register("password", { required: true })}
                className='form-control'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <span style={{ color: "crimson"}}>This field is required</span>}
            </div>

            <div className="user-box">
              <input
                type="password" {...register("confirmPassword", { required: true })}
                className='form-control'
                placeholder='Enter confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && <span style={{ color: "crimson" }}>This field is required</span>}
            </div>

            <button type="submit" id="submit-login" className='button-1' disabled={loading}>
              {loading ? 'Reset Password ...' : 'Reset Password'}
            </button>
          </form>


        </div>
        <Footer />
      </div>
    </Transitions>
  )
};

export default ResetPasswordNow;

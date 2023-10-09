import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux';
import './pages.css'
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { login } from "../state/actions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../components/Footer"

import Header from '../components/Header'

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const loginMutation = useMutation((data) => dispatch(login(data)), {
    onMutate: () => {
      setLoading(true); // Set loading state to true before the mutation starts
    },

    onSuccess: () => {
      // data here is the result of the login mutation (e.g., user data)
      setLoading(false); // Set loading state to false after a successful login
      navigate("/add-product")
    },

    // Use onError callback to handle errors
    onError: () => {
      setLoading(false); // Set loading state to false after an error
      const notify = () => toast("User does not exist");
      notify();
      // Handle the error here, such as displaying an error message to the user
      navigate("/sign-in")
    },
  })


  const onSubmit = async (data) => {
    loginMutation.mutate(data);
  };

  return (
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
        <h2>Sign In</h2>
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
          <div className="user-box">
            <input
              type="password" {...register("password", { required: true })}
              className='form-control'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span>This field is required</span>}
          </div>

          <button type="submit" id="submit-login" className='button-1' disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <span style={{ display: "flex", margin: "2rem 0", color: "#fff", paddingBottom: "1rem"}}>
          <span class="txt1">
            Not a member?
          </span>
          <Link style={{ color: "green", cursor: "pointer", textDecoration: "none"}} to="" class="txt1 bo1 hov1" href="#">
            Sign up now
          </Link>
        </span>
        
      </div>
      <Footer />
    </div>
  )
};

export default Signin;

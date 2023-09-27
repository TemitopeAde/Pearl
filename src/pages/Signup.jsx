import { useForm } from "react-hook-form"
import './pages.css'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "react-query";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signUp } from "../state/actions";
import Toast from "../constants/Toast";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()



  const signUpMutation = useMutation((data) => dispatch(signUp(data)), {
    onMutate: () => {
      setLoading(true); // Set loading state to true before the mutation starts
    },

    onSuccess: () => {
      const notify = () => toast("Success");
      notify();
      // data here is the result of the login mutation (e.g., user data)
      setLoading(false); // Set loading state to false after a successful login
      navigate("/sign-in")
    },

    // Use onError callback to handle errors
    onError: (err) => {
      console.log(err.response.data.message, "err");
      setLoading(false); // Set loading state to false after an error
      const notify = () => toast(err.response.data.message);
      notify();
      // Handle the error here, such as displaying an error message to the user
      navigate("/sign-up")
    },
  })

  const onSubmit = (data) => {
    signUpMutation.mutate(data)
  }



  return (
    <div>
      {/* <Toast /> */}

      <div className="login-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="user-box">

            <input
              type="text"
              {...register("name", { required: true })}
              className='form-control'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <span>This field is required</span>}
          </div>
          <div className="user-box">

            <input
              type="email"
              {...register("email", { required: true })}
              className='form-control'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span>This field is required</span>}
          </div>
          <div className="user-box">

            <input
              type="password"
              {...register("password", { required: true })}
              className='form-control'
              placeholder='Enter password'
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span>This field is required</span>}
          </div>
          <div className="user-box">

            <input
              type="password" {...register("confirmPassword", { required: true })}
              className='form-control'
              placeholder='Enter confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <span>This field is required</span>}
          </div>
          <button type="submit" className='button-1'>
            Sign up
          </button>
        </form>
      </div>
    </div>
    
  )
};

export default Signup;

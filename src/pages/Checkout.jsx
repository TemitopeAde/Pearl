import { useForm } from "react-hook-form"
import './pages.css'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "react-query";
// import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getPaymentLink, signUp } from "../state/actions";


const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [price,setPrice] = useState("")
  const totalPrice = useSelector((state) => state.products.totalPrice)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const checkOutMutation = useMutation((data) => dispatch(getPaymentLink(data)), {
    onMutate: () => {
      setLoading(true); // Set loading state to true before the mutation starts
    },

    onSuccess: (data) => {
      const notify = () => toast("Success");
      const link = data.data.link
      notify();
      // data here is the result of the login mutation (e.g., user data)
      setLoading(false); // Set loading state to false after a successful login
      window.location.replace(`${link}`);
    },

    // Use onError callback to handle errors
    onError: (err) => {
      console.log(err.response.data.message, "err");
      setLoading(false); // Set loading state to false after an error
      const notify = () => toast(err.response.data.message);
      notify();
    },
  })

  const onSubmit = (data) => {
    console.log(data);
    checkOutMutation.mutate(data)
  }


  return (
    <div>

      <div className="login-box">
        <h2>Checkout form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="user-box">
            <input type="hidden" 
              {...register("price", { required: true })}
              className='form-control'
              value={totalPrice}
            />
            <input
              type="text"
              {...register("name", { required: true })}
              className='form-control'
              placeholder='Enter your fullname'
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
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span>This field is required</span>}
          </div>
          <div className="user-box">


            <input
              type="number"
              {...register("phonenumber", { required: true })}
              className='form-control'
              placeholder='Enter phone number'
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
            {errors.phonenumber && <span>This field is required</span>}
          </div>
          
          <button type="submit" className='button-1'>
            Proceed
          </button>
        </form>
      </div>
    </div>

  )
};

export default Signup;

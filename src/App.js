import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import ProductDetail from "./pages/ProductDetail";
import CartContainer from "./pages/CartContainer";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import { AnimatePresence } from 'framer-motion';
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordNow from "./pages/ResetPasswordNow";
import CheckoutForm from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";


export default function App() {
  return (
    <AnimatePresence mode="wait" >
      <Routes>
        <Route path="" element={<ProductList />} />
        <Route path="sign-up" element={<Signup />} />
        <Route path="sign-in" element={<Signin />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartContainer />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        {/* <Route path="/payment-success" element={<Success />} /> */}
        <Route path="/forget-password" element={<ResetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPasswordNow />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
      </Routes>
    </AnimatePresence>
  );
}

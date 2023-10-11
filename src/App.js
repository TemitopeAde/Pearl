import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import ProductDetail from "./pages/ProductDetail";
import CartContainer from "./pages/CartContainer";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import UpdateProduct from "./pages/EditProduct";
import { AnimatePresence } from 'framer-motion';
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordNow from "./pages/ResetPasswordNow";


export default function App() {
  return (
    <AnimatePresence mode="wait" >
      <Routes>
        <Route path="" element={<ProductList />} />
        <Route path="sign-up" element={<Signup />} />
        <Route path="sign-in" element={<Signin />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartContainer />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-success" element={<Success />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
        <Route path="/forget-password" element={<ResetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPasswordNow />} />
      </Routes>
    </AnimatePresence>
  );
}

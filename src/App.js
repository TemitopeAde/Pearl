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


export default function App() {
  return (
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
    </Routes>
  );
}

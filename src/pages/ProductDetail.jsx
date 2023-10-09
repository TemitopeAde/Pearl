import React, { useEffect, useState } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useParams } from 'react-router-dom';
// or other themes
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';
import { addToCart, getProduct, modifyCartItemQuantity } from '../state/actions';
import { useMutation } from 'react-query';
import Header from '../components/Header'
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import Toast from '../constants/Toast';
import Footer from '../components/Footer';


const ProductDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState();
  const [product, setProduct] = useState({})
  const dispatch = useDispatch(id);
  const shoppingCart = useSelector((state) => state.products.shoppingCart);

  useEffect(() => {
    getProductMutation.mutate()
  }, [])

  const addCart = (product) => {
    const existingItem = shoppingCart.find((item) => item?._id === product?._id);

    console.log(existingItem);

    if (existingItem) {
      // If the item exists in the cart, modify its quantity
      const newQuantity = existingItem.quantity + 1;
      dispatch(modifyCartItemQuantity(existingItem._id, newQuantity));

      const updated = () => toast("Product updated");
      updated();
    } else {
      // If the item is not in the cart, add it with a quantity of 1
      const newItem = { ...product, quantity: 1, totalPrice: product?.price };
      dispatch(addToCart(newItem));
      const updated = () => toast("Product added to cart");
      updated();
    }
  };


  const getProductMutation = useMutation((data) => dispatch(getProduct(id)), {
    onMutate: () => {
      setLoading(true)
    },

    onSuccess: (data) => {
      setProduct(data)
      setLoading(false)
    },

    onError: () => {
      setLoading(false)
    }
  })

  switch (loading) {
    case true:
      return <Loader />

    case false:
      return (
        <div className="product-details">
          <Toast />
          <Header />

          <section className="product-wrapper">
            <div className="product-img">
              <img src="data:image/jpeg;base64,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" alt="" />
            </div>

            <div className="product-description">
              <h3>Lorem ipsum dolor, sit amet consectetur adipisicing.</h3>
              <h4>$100</h4>
              <div className="product-quantity">
                <button>-</button>
                <h4>2</h4>
                <button style={{ background: "green" }}>+</button>
              </div>
              <button id="add-to-cart-btn">Add to Cart</button>
            </div>
          </section>

          <Footer />
        </div>

      )

    default:
      break
  }


}

export default ProductDetail
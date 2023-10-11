import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
// or other themes
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';
import { addToCart, getProductWithImage, modifyCartItemQuantity, removeFromCart } from '../state/actions';
import { useMutation } from 'react-query';
import Header from '../components/Header'
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import Transitions from '../constants/Transition'
import Toast from '../constants/Toast'

const ProductDetail = () => {
  const { id } = useParams();
  
  const [loading, setLoading] = useState();
  const [product, setProduct] = useState({})
  const dispatch = useDispatch(id);
  const shoppingCart = useSelector((state) => state.products.shoppingCart);
  // console.log(shoppingCart);

  const cartItem = shoppingCart.find((item) => item?.id === product?.product?.data?.id);
  console.log(cartItem);

  useEffect(() => {
    getProductMutation.mutate()
  }, [id])

  const addCart = (product) => {
    // console.log(product?.id);
    const existingItem = shoppingCart.find((item) => item?.id === product?.id);
    
  
    if (existingItem) {
      // console.log(existingItem)
      
      const newQuantity = existingItem.quantity + 1;
      dispatch(modifyCartItemQuantity(existingItem?.id, newQuantity));
      const updated = () => toast("Product updated");
      updated();
    } else {
      console.log("new product")
      // If the item is not in the cart, add it with a quantity of 1
      const newItem = { ...product, quantity: 1, totalPrice: product?.list_price };
      console.log(newItem);
      dispatch(addToCart(newItem));
      const updated = () => toast("Product added to cart");
      updated();
    }
  };

  const getProductMutation = useMutation((data) => dispatch(getProductWithImage(id)), {
    onMutate: () => {
      setLoading(true)
    },

    onSuccess: (data) => {
      // console.log(data);
      setProduct(data)
      setLoading(false)
    },

    onError: (err) => {
      setLoading(false)
    }
  })

  const handleDecreaseQuantity = (productId) => {
    // Find the cart item by product ID
    console.log(productId)
    const cartItem = shoppingCart.find((item) => item?.data?.id === productId);

    if (cartItem) {
      if (cartItem.quantity === 1) {
        dispatch(removeFromCart(productId));
      } else {
        // Dispatch the modifyCartItemQuantity action to decrease the quantity
        const newQuantity = cartItem.quantity - 1;
        dispatch(modifyCartItemQuantity(productId, newQuantity));
        const updated = () => toast("Product updated");
        updated();
      }
    }
  };

  // console.log()

  switch (loading) {
    case true:
      return <Loader />

    case false:
      return (
        <Transitions>


          <div className="product-details">
            <Toast />
            <Header />

            {/* {console.log(product?.product?.data)} */}

            <section className="product-wrapper">
              <div className="product-img">
                <img src={`https://${product?.image?.data[0].domain}${product?.image?.data[0].path}${product?.image?.data[0].filename}`} alt="" />
              </div>

              <div className="product-description">
                <h3> {`${product?.product?.data.name}`}</h3>
                <h4>${`${product?.product?.data.list_price}`}</h4>
                <div className="product-quantity">
                  <button onClick={() => handleDecreaseQuantity(product?.product?.data?.id)}>-</button>
                  <h4>{cartItem.quantity}</h4>
                  
                  <button onClick={() => addCart(product?.product?.data)} style={{ background: "green" }}>+</button>
                </div>
                <button onClick={() => addCart(product?.product?.data)} id="add-to-cart-btn">Add to Cart</button>
              </div>
            </section>

            {/* <Footer />  */}
          </div>
        </Transitions>

      )

    default:
      break
  }


}

export default ProductDetail
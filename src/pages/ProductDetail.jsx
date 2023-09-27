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
        <div>
          <Toast />
          <Header />

          <div className='product-card'>
            <div className="card card-flex">
              <div className="description">
                <h2>{product?.product?.name}</h2>
                <h1>${product?.product?.price}</h1>
                <p>{product?.product?.description}</p>
                <p style={{ textTransform: "capitalize" }}><b>Category:  </b>{product?.product?.category}</p>

                <div className="card-flex">
                  <button onClick={() => addCart(product.product)}>Add to Cart</button>
                  <button>Wishlist</button>
                </div>

                <Link to="/" className='btn-transparent'>
                  <svg fill="#000000" height="40px" width="80px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 219.151 219.151" xmlSpace="preserve">
                    <g>
                      <path d="M109.576,219.151c60.419,0,109.573-49.156,109.573-109.576C219.149,49.156,169.995,0,109.576,0S0.002,49.156,0.002,109.575
      C0.002,169.995,49.157,219.151,109.576,219.151z M109.576,15c52.148,0,94.573,42.426,94.574,94.575
      c0,52.149-42.425,94.575-94.574,94.576c-52.148-0.001-94.573-42.427-94.573-94.577C15.003,57.427,57.428,15,109.576,15z"/>
                      <path d="M94.861,156.507c2.929,2.928,7.678,2.927,10.606,0c2.93-2.93,2.93-7.678-0.001-10.608l-28.82-28.819l83.457-0.008
      c4.142-0.001,7.499-3.358,7.499-7.502c-0.001-4.142-3.358-7.498-7.5-7.498l-83.46,0.008l28.827-28.825
      c2.929-2.929,2.929-7.679,0-10.607c-1.465-1.464-3.384-2.197-5.304-2.197c-1.919,0-3.838,0.733-5.303,2.196l-41.629,41.628
      c-1.407,1.406-2.197,3.313-2.197,5.303c0.001,1.99,0.791,3.896,2.198,5.305L94.861,156.507z"/>
                    </g>
                  </svg>
                </Link>

              </div>

              <div className="photo">
                <Splide options={{
                  autoplay: true,
                  type: "loop",
                  lazyLoad: true,
                }} aria-label="My Favorite Images">

                  {product.product?.images.map((product) => {
                    return (
                      <SplideSlide key={product._id}>
                        <img src={product.url} alt="product" />
                      </SplideSlide>
                    )
                  })}
                </Splide>

              </div>
            </div>
          </div>
        </div>
      ) 
  
    default:
      break
  }

  
}

export default ProductDetail
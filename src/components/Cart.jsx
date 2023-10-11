import React, { useEffect, useState } from 'react'
import './styles/cart.css'
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, getTotalCartPrice, modifyCartItemQuantity, removeFromCart, getTotalCartNumber, clearCart } from '../state/actions';
import { toast } from 'react-toastify';
import DeleteModal from './DeleteModal';

const Cart = () => {
  const shoppingCart = useSelector((state) => state.products.shoppingCart);
  const totalNumber = useSelector((state) => state.products.totalNumberCart)
  const totalPrice = useSelector((state) => state.products.totalPrice)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  console.log(shoppingCart);

  useEffect(() => {
    dispatch(getTotalCartNumber());
    dispatch(getTotalCartPrice())
  }, [shoppingCart, dispatch])

  const addCart = (product) => {
    console.log(product);
    const existingItem = shoppingCart.find((item) => item?.data?.id === product?._id);

    

    if (existingItem) {
      
      // If the item exists in the cart, modify its quantity
      console.log(existingItem);
      const newQuantity = existingItem.quantity + 1;
      dispatch(modifyCartItemQuantity(existingItem?.data?.data?.id, newQuantity));

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

  const handleDecreaseQuantity = (productId) => {
    // Find the cart item by product ID
    const cartItem = shoppingCart.find((item) => item._id === productId);

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

  const handleDelete = (id) => {
    // setOpen(!open)
    dispatch(removeFromCart(id))
    // setOpen(false)
  }


  return (
    <>
      <section className='cart-flex'>
        {shoppingCart.length !== 0 ? shoppingCart?.map((item, index) => {
          return (
            <div key={index}>
              <section className="cart-grid" >
                
                <div>
                  <h4>{item?.name}</h4>
                </div>

                <div className="product-quantity">
                  <button onClick={() => handleDecreaseQuantity(item._id)}>-</button>
                  <h4>{item?.quantity}</h4>
                  <button onClick={() => addCart(item)}>+</button>
                </div>
                <div>
                  <h4>${item?.list_price}</h4>
                </div>
                <div className='delete-btn'>
                  {console.log(item?.data?.id)}
                  <button onClick={() => handleDelete(item?.data?.id)}>
                    <img src="https://img.icons8.com/color/96/delete-forever.png" alt="delete-forever" />
                  </button>

                </div>
              </section>
            </div>
          )
        }) : <h6>No cart items</h6>}
      </section> 

      {/* <DeleteModal open={open} setOpen={setOpen} />


      {/* {shoppingCart.length !== 0 && <section className='cart-proceed'>
        <section>
          <h3>Total products</h3>
          <h4>{totalNumber}</h4>
        </section>
        <section className='continue-section'>
          <button id="clear-cart" onClick={() => dispatch(clearCart())}>Clear cart</button>
          <button onClick={() => navigate("/checkout")}>{`Proceed ${totalPrice} NGN`}</button>
          
        </section>
      </section>} */}


    </>
  )
}

export default Cart
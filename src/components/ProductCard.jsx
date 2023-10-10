import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Link, useNavigate } from 'react-router-dom'
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux'
import debounce from 'lodash/debounce';
import { getAllProducts, login, modifyCartItemQuantity, searchProducts } from '../state/actions/index';
import Loader from "../components/Loader";
import { useForm } from "react-hook-form"
import 'swiper/css';
import 'swiper/css/navigation';
import { toast } from 'react-toastify';
import Toast from '../constants/Toast';
import cartImage from '../images/cart.svg';
import './styles/productcard.css';
import { getCartNumber, getCartProducts, addToCart } from '../state/actions/index.js'



const ProductCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalPages = useSelector((state) => state.products.totalPages);

  const shoppingCart = useSelector((state) => state.products.shoppingCart);
  const [loading, setLoading] = useState();
  const [currentPage, setCurrentPage] = useState("");
  const [products, setProducts] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [prevPage, setPrevPage] = useState("");

  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState("");
  const [load, setLoad] = useState(false);
  const [items, setItems] = useState();



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  console.log(window.env.API_URL);

  

  useEffect(() => {
    dispatch(getCartProducts(cart))
    dispatch(getCartNumber(cartItems))
  }, [cart, cartItems, dispatch])


  useEffect(() => {
    console.log("fetch")
    getAllProductsMutation.mutate();
  }, [currentPage, nextPage, prevPage])


  const addCart = (product) => {
    const existingItem = shoppingCart.find((item) => item._id === product._id);
    

    if (existingItem) {
      // If the item exists in the cart, modify its quantity
      const newQuantity = existingItem.quantity + 1;
  
      dispatch(modifyCartItemQuantity(existingItem._id, newQuantity));

      const updated = () => toast("Product updated");
      updated();
    } else {
      // If the item is not in the cart, add it with a quantity of 1
      const newItem = { ...product, quantity: 1, totalPrice: product.price };
      dispatch(addToCart(newItem));

      const updated = () => toast("Product added to cart");
      updated();
    }

    // ... Rest of your addToCart logic
  };

  const getAllProductsMutation = useMutation((data) => dispatch(getAllProducts(currentPage)), {
    onMutate: () => {
      setLoading(true)
    },

    onSuccess: (data) => {
      console.log(data);
      setLoading(false)
      setCurrentPage(data.meta.cursor?.current);
      setProducts(data.productsWithImages);
      console.log(products);
      setPrevPage(data.meta.cursor?.prev);
      setNextPage(data.meta.cursor?.next);

      console.log(prevPage, nextPage, currentPage);
    },

    onError: () => {
      setLoading(false)
    }
  })
  const searchMutation = useMutation((data) => dispatch(searchProducts(data)), {
    onMutate: () => {
      setLoad(true); // Set loading state to true before the mutation starts
    },

    onSuccess: (data) => {

      setLoad(false); // Set loading state to false after a successful login
      navigate("/")
    },

    // Use onError callback to handle errors
    onError: () => {
      setLoad(false); // Set loading state to false after an error
      // const notify = () => toast("Product not found");
      // notify();
    },
  })

  // useEffect(() => {
  //   getAllProductsMutation.mutate();
  // }, [])

  // const handlePageChange = (newPage) => {
  //   setPage(newPage);
  // };

  const debouncedSearch = debounce((query) => {
    // Call your searchProducts function with the query
    searchMutation.mutate(query);
  }, 3000); 


  const onChange = (e) => {
    debouncedSearch(e.target.value);
  }

  const pageNumbers = [];
  for (let i = Math.max(1, parseInt(currentPage) - 3); i <= Math.min(parseInt(totalPages), parseInt(currentPage) + 3); i++) {
    pageNumbers.push(i);
  }

  const handlePagination = (e) => {
    setCurrentPage(e)
  }


  switch (loading) {
    case true:
      return (
        <Loader />
      )

    case false:
      return (
        <div className="container page-wrapper">
          <Toast />
          <div className="page-inner">
            
            <div className="product-card-container">

              
              
              {(products?.length !== 0 ? products?.map((item, index) => (
                
                <div key={index}>
                  <div className="product-card">
                    <div className="product-image">
                      <img src={`https://${item.image_url}`} alt={item.name} />
                    </div>

                    <div className="product-info">                      
                      <Link to={`/product/${item._id}`}>
                        <h5>{item?.name}</h5>
                        {/* {console.log(item)} */}
                      </Link>

                      <div className="flex-between">
                        <button onClick={() => addCart(item)}>
                          {/* <img src={cartImage} alt={item?.name} /> */}
                        </button>
                        <h5>${item?.list_price}</h5>
                      </div>

                    </div>
                  </div>
                </div>

              )) : <h3>No products found</h3>)}
            </div>

            {products?.length !== 0 && <div className="products-pagination">
              <ul>
                {prevPage && <li>
                  <button
                    onClick={() => handlePagination(prevPage)}>
                    Previous
                  </button>
                </li>}
                
                {nextPage && <li>
                  <button
                    onClick={() => handlePagination(nextPage)}>
                    Next
                  </button>
                </li>}
              </ul>
            </div>}
          </div>
        </div>
      )

    default:
      break;
  }

};


export default ProductCard
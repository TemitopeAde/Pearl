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
  const products = useSelector((state) => state.products.fetchedProducts);
  const totalPages = useSelector((state) => state.products.totalPages);
  const currentPage = useSelector((state) => state.products.currentPageNumber);
  const shoppingCart = useSelector((state) => state.products.shoppingCart);
  const [loading, setLoading] = useState();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("male")
  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState("");
  const [load, setLoad] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()


  useEffect(() => {
    dispatch(getCartProducts(cart))
    dispatch(getCartNumber(cartItems))
  }, [cart, cartItems, dispatch])

  useEffect(() => {
    getAllProductsMutation.mutate();
  }, [page])

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

  const getAllProductsMutation = useMutation((data) => dispatch(getAllProducts(page)), {
    onMutate: () => {
      setLoading(true)
    },

    onSuccess: (data) => {
     
      setLoading(false)
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

  useEffect(() => {
    getAllProductsMutation.mutate();
  }, [])

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const debouncedSearch = debounce((query) => {
    // Call your searchProducts function with the query
    searchMutation.mutate(query);
  }, 3000); // 20,000 milliseconds (20 seconds)

  const onChange = (e) => {
    debouncedSearch(e.target.value);
  }

  const pageNumbers = [];
  for (let i = Math.max(1, parseInt(currentPage) - 3); i <= Math.min(parseInt(totalPages), parseInt(currentPage) + 3); i++) {
    pageNumbers.push(i);
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
            <div className="search-product">
              <form>
                <input
                  type="text"
                  {...register("query", { required: true })}
                  className="search-form form-control"
                  onChange={onChange}
                  placeholder='Search products by name'
                />

                <select className='form-control' onChange={onChange}>
                  <option value="" disabled>Select a category</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>

              </form>
            </div>
            <div className="product-card-container">
              
              {(products.length !== 0 ? products && products.map((item, index) => (
                <div key={index}>
                  <div className="product-card">
                    <div className="product-image">
                      <Splide options={{
                        autoplay: false,
                        type: "loop",
                        lazyLoad: true,
                      }} aria-label="My Favorite Images">

                        { item.images.map((pics, index) => {
                        
                          return (
                            <SplideSlide key={index}>
                              <img src={pics.url} alt={item.name} />
                            </SplideSlide>
                          )
                        })}

                       

                      </Splide>
                    </div>

                    <div className="product-info">
                      <div className='flex-between'>
                        <h6>{item?.category}</h6>
                        <h6>{item?.color}</h6>
                        <h6>{item?.size}</h6>
                      </div>
                      
                      <Link to={`/product/${item._id}`}>
                        <h5>{item?.name}</h5>
                      </Link>

                      <div className="flex-between">
                        <button onClick={() => addCart(item)}>
                          <img src={cartImage} alt={item?.name} />
                        </button>
                        <h5>{item?.price} NGN</h5>
                      </div>

                    </div>
                  </div>
                </div>

              )) : <h3>No products found</h3>)}
            </div>

            {products.length !== 0 && <div className="products-pagination">
              <ul>
                <li>
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={parseInt(currentPage) === 1}
                    className={parseInt(currentPage) === 1 ? "disabled" : ""}
                  >
                    Previous
                  </button>
                </li>
                {
                  pageNumbers.map((item, index) => (

                    <li key={index}>
                      <button
                        className={parseInt(currentPage) === item ? "active" : ""}
                        onClick={() => handlePageChange(item)}
                      >
                        {item}
                      </button>
                    </li>
                  ))
                }
                <li>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={parseInt(currentPage) === parseInt(totalPages)}
                    className={parseInt(currentPage) === parseInt(totalPages) ? "disabled" : ""}
                  >
                    Next
                  </button>
                </li>
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
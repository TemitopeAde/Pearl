import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, modifyCartItemQuantity } from '../state/actions/index';
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
  const shoppingCart = useSelector((state) => state.products.shoppingCart);
  const [loading, setLoading] = useState();
  const [currentPage, setCurrentPage] = useState("");
  const [products, setProducts] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [prevPage, setPrevPage] = useState("");
  const [query, setQuery] = useState("");

  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState("");


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
  }, [currentPage, nextPage, prevPage, dispatch])

  useEffect(() => {
    getAllProductsMutation.mutate();
  }, [])

  // console.log(shoppingCart);

  const addCart = (product) => {
    // console.log(product?.id);
    const existingItem = shoppingCart.find((item) => item?.id === product?.id);


    if (existingItem) {
      const newQuantity = existingItem.quantity + 1;
      dispatch(modifyCartItemQuantity(existingItem?.id, newQuantity));
      const updated = () => toast("Product updated");
      updated();
    } else {
      const newItem = { ...product, quantity: 1, totalPrice: product?.list_price };
      dispatch(addToCart(newItem));
      const updated = () => toast("Product added to cart");
      updated();
    }
  };

  const getAllProductsMutation = useMutation((data) => dispatch(getAllProducts({ currentPage, query })), {
    onMutate: () => {
      setLoading(true)
    },

    onSuccess: (data) => {
      // console.log(data);
      setLoading(false)
      setCurrentPage(data.meta.cursor?.current);
      setProducts(data.productsWithImages);
      // console.log(products);
      setPrevPage(data.meta.cursor?.prev);
      setNextPage(data.meta.cursor?.next);
    },

    onError: () => {
      setLoading(false)
    }
  })




  const handlePagination = (e) => {
    setCurrentPage(e)
  }

  const onSubmit = (e) => {
    getAllProductsMutation.mutate();
  }
  console.log(query);
  const handleSearch = () => {
    window.location.reload(true);
    if (!query) {
      getAllProductsMutation.mutate();
    }
    
    // Reset the query value after the mutation
    setQuery(""); // Clear the input field
  };

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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    {...register("query", { required: true })}
                    className="search-form form-control"
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    placeholder='Search products by name'
                  />

                  <span onClick={handleSearch} style={{ display: query ? 'inline-block' : 'none' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                      <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                    </svg>
                  </span>
                </div>


                <button type="submit">Search</button>
              </form>
            </div>

            <div className="product-card-container">



              {(products?.length !== 0 ? products?.map((item, index) => (
                <div key={index}>
                  <div className="product-card">
                    <div className="product-image">
                      <img src={`https://${item.image_url}`} alt={item.name} />
                    </div>

                    <div className="product-info">
                      <Link to={`/product/${item.id}`}>
                        <h5>{item?.name}</h5>
                      </Link>
                      <h5 style={{ margin: "7px 0" }}>${item?.list_price}</h5>
                      <div>
                        <button type='button' onClick={() => addCart(item)}>
                          <img src={cartImage} alt={item?.name} />
                        </button>
                      </div>

                      {/* <div className="flex-between">
                        <button onClick={() => addCart(item)}>
                          <img src={cartImage} alt={item?.name} />
                          <h5>${item?.list_price}</h5>
                        </button>
                        <h5>${item?.list_price}</h5>
                      </div> */}

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
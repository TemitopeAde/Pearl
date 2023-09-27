import { useForm } from "react-hook-form";
import './pages.css';
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { addProduct, getProduct } from "../state/actions";
import Loader from "../components/Loader";
import Header from '../components/Header';

const UpdateProduct = () => {

  
  const {id} = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [load,setLoad] = useState(false);
  // console.log(productItem.product?.name, "item")
  const initialProductState = {
    name: "",
    price: "",
    description: "",
    size: "",
    category: "",
    color: ""
  };
  const [product, setProduct] = useState(initialProductState);
  const [formValues, setFormValues] = useState(initialProductState);

  // console.log(product);



  

  const getProductMutation = useMutation((data) => dispatch(getProduct(id)), {
    onMutate: () => {
      setLoading(true)
    },

    onSuccess: (data) => {
      setProduct(data.product || initialProductState);
      setFormValues(data.product || initialProductState);
      setLoading(false);
      setLoading(false)
    },

    onError: (err) => {
      console.log(err);
      setLoading(false)
    }
  })

  useEffect(() => {
    getProductMutation.mutate()
  }, [id])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const sizes = [
    { value: '', text: '--Choose an option--' },
    { value: "xs", text: "Extra small" },
    { value: 's', text: 'Small' },
    { value: 'm', text: 'Medium' },
    { value: "l", text: "Large" },
    { value: "xl", text: "Extra large" },
    { value: "xxl", text: "Extra extra large" }
  ];

  const categories = [
    { value: "", text: "--Choose an option--" },
    { value: "female", text: "Female wears" },
    { value: "male", text: "Male wears" },
    { value: "unisex", text: "Male and female wears" }
  ]

  const color = [
    { value: "", text: "--Choose an option" },
    { value: "red", text: "Red" },
    { value: "blue", text: "Blue" },
    { value: "green", text: "Green" },
    { value: "yellow", text: "Yellow" },
    { value: "black", text: "Black" },
    { value: "white", text: "White" },
    { value: "others", text: "Others" },
  ]

  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setImages([...selectedFiles]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateProductMutation = useMutation(
    async (data) => {
      try {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('size', data.size);
        formData.append('category', data.category);
        formData.append('color', data.color)

        for (let i = 0; i < data.images.length; i++) {
          formData.append(`images`, data.images[i]);
        }

        const response = await axios.patch(`https://backend-5kyc.onrender.com/api/v1/products/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 201) {
          const success = () => toast("Product updated successfully.");
          success();
          setFormValues(initialProductState)
          // Clear the form and images after successful submission
          setProduct(initialProductState);
        } else {
          console.log(response);
          const fail = () => toast("Product was not updated");
          fail();
        }
      } catch (error) {
        const fail = () => toast("Product was not updated");
        fail();
        console.error('Error updating product and images:', error);
      }
    },
    {
      onMutate: () => {
        setLoad(true);
      },
      onSuccess: () => {
        setLoad(false);
      },
      onError: () => {
        setLoad(false);
      },
    }
  );

  
  const onSubmit = (data) => {
    console.log(data);
    updateProductMutation.mutate(data);
    // uploadProduct(data);
  };

  const handleChangeSize = (event) => {
    const { value } = event.target;
    setProduct({
      ...product,
      size: value
    });
  };

  const handleChangeCategory = (event) => {
    const { value } = event.target;
    setProduct({
      ...product,
      category: value
    });
  };

  const handleChangeColor = (event) => {
    const { value } = event.target;
    setProduct({
      ...product,
      color: value
    });
  };


  switch (loading) {
    case true:
      return <Loader />
    
    case false: 
      return (
        <div>
          <Header />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />

          <div className="login-box" id="add-product">
            <h2>Add Product</h2>
            {console.log(product?.name)}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="user-box">
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className='form-control'
                  placeholder='Enter product name'
                  value={product?.name}
                  onChange={handleInputChange}
                />
                {errors.name && <span>This field is required</span>}
              </div>
              <div className="user-box">
                <select
                  {...register("size", { required: true })}
                  className="form-control"
                  value={product.size}
                  onChange={handleChangeSize}
                >
                  {sizes.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
                {errors.size && <span>This field is required</span>}
              </div>

              <div className="user-box">
                <select
                  className="form-control"
                  {...register("category", { required: true })}
                  value={product.category}
                  onChange={handleChangeCategory}
                >
                  {
                    categories.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))
                  }
                </select>
                {errors.category && <span>This field is required</span>}
              </div>

              <div className="user-box">
                <select
                  className="form-control"
                  {...register("color", { required: true })}
                  value={product.color}
                  onChange={handleChangeColor}
                >
                  {
                    color.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))
                  }
                </select>
                {errors.color && <span>This field is required</span>}
              </div>

              <div className="user-box">
                <input
                  type="number"
                  {...register("price", { required: true })}
                  className='form-control'
                  placeholder='Enter product price'
                  value={product.price}
                  onChange={handleInputChange}
                />
                {errors.price && <span>This field is required</span>}
              </div>
              <div className="user-box">
                <textarea
                  {...register("description", { required: true })}
                  placeholder="Enter product description"
                  onChange={handleInputChange}
                  value={product.description}
                  className="form-control"
                />
                {errors.description && <span>This field is required</span>}
              </div>

              <div className="user-box">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  src={formValues.images?.url}
                  onChange={handleFileChange}
                  {...register("images", { required: false })}
                />
                {errors.images && <span>This field is required</span>}
                 { formValues?.images?.map((img, index) => {
                  return (
                    <img key={index} className="img-preview" src={img.url} alt="" />
                  )
                 })}
              </div>

              <button type="submit" className='button-1'>
                 {load ? "Edit product ...": "Edit product"} 
              </button>
            </form>
          </div>
        </div>
      );
  
    default:
      break;
  }

  
};

export default UpdateProduct;

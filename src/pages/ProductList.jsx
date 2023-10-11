import React from 'react';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Transitions from '../constants/Transition';

const ProductList = () => {
  return (
    <Transitions>
      <Header />
      <ProductCard />
      <Footer />
    </Transitions>

  )
}

export default ProductList
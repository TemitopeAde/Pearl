import React, { useState } from 'react';
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import "./styles/Header.css"
import ModalContainer from './Modal';

const Header = () => {
  const cartNumber = useSelector(state => state.products.shoppingCart)
  const [open, setOpen] = useState(false)
  console.log(open);
  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <Link to="/">ADESIYAN</Link>
          </div>

          <nav className="nav">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/sign-in">Sign In</Link>
              </li>
              <li className="nav-item">
                <Link to="/sign-up">Sign Up</Link>
              </li>
              <li className="nav-item cart">
                <button onClick={() => setOpen(!open)}>
                  <img src="https://img.icons8.com/ios/50/shopping-bag--v1.png" alt="shopping-bag--v1" />
                </button>
                {cartNumber && <span className="cart-count">{cartNumber.length}</span>}
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <ModalContainer open={open} setOpen = {setOpen} />
    </>
  );
};

export default Header;

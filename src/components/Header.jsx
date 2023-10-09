import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import "./styles/Header.css"
import ModalContainer from './Modal';
import logo from '../images/logo.webp'

const Header = () => {
  const cartNumber = useSelector(state => state.products.shoppingCart)
  const [open, setOpen] = useState(false)
  const [toggle, setToggle] = useState(false);
  
  const handleToggleClick = () => {
    setToggle(!toggle);

    // Add a class to the header element when the button is clicked
    const header = document.querySelector('.header');
    if (header) {
      
      if (toggle) {
        header.classList.remove('menu-opened');
      } else {
        header.classList.add('menu-opened');
      }
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>

          <nav className="nav">
            <ul className="nav-list">
              <li className="nav-item">
                <Link className="button-1" to="/sign-in">Sign In</Link>
              </li>
              <li className="nav-item">
                <Link className="button-1" to="/sign-up">Sign Up</Link>
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

        <div className="hamburger-menu">
          <button onClick={handleToggleClick} type="button">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M2.6193 25.3807C4.57191 27.3333 7.7146 27.3333 14 27.3333C20.2853 27.3333 23.4281 27.3333 25.3807 25.3807C27.3333 23.4281 27.3333 20.2853 27.3333 14C27.3333 7.71459 27.3333 4.5719 25.3807 2.61928C23.4281 0.666656 20.2853 0.666656 14 0.666656C7.7146 0.666656 4.57191 0.666656 2.6193 2.61928C0.666672 4.5719 0.666672 7.71459 0.666672 14C0.666672 20.2853 0.666672 23.4281 2.6193 25.3807ZM23 19.3333C23 19.8856 22.5523 20.3333 22 20.3333H6C5.44772 20.3333 5 19.8856 5 19.3333C5 18.7811 5.44772 18.3333 6 18.3333H22C22.5523 18.3333 23 18.7811 23 19.3333ZM22 15C22.5523 15 23 14.5523 23 14C23 13.4477 22.5523 13 22 13H6C5.44772 13 5 13.4477 5 14C5 14.5523 5.44772 15 6 15H22ZM23 8.66666C23 9.21894 22.5523 9.66666 22 9.66666H6C5.44772 9.66666 5 9.21894 5 8.66666C5 8.11438 5.44772 7.66666 6 7.66666H22C22.5523 7.66666 23 8.11438 23 8.66666Z" fill="white" />
            </svg>

          </button>
        </div>
      </header>
      <ModalContainer open={open} setOpen={setOpen} />
    </>
  );
};

export default Header;

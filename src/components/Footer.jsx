import React from 'react'
import { Link } from 'react-router-dom';

import './styles/footer.css'

const Footer = () => {
  return (
    <section>
      <footer>
        <div className="footers">
          <div className="footer-row social-icons">
            <Link to="https://www.facebook.com/profile.php?id=100092539806075"><i className="fa fa-facebook icon-white"></i></Link>
            <Link to="https://instagram.com/bc.offroading?igshid-YmMyMTA2M2Y="><i className="fa fa-instagram icon-white"></i></Link>
          </div>

          <div className="footer-row-2">
            <ul>
              <li><Link>Contact us</Link></li>
              <li><Link>Home</Link></li>
              <li><Link>Shop</Link></li>
            </ul>
          </div>

          <div className="footer-row">
            Copyright ©2023 by Blue Collar Off-Roading
          </div>
        </div>
      </footer>
    </section>
  )
}

export default Footer
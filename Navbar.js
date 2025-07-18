import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { cartCount } = useContext(CartContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold" to="/">ShopZilla</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-2">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cart">Cart ({cartCount})</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/orders">Orders</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

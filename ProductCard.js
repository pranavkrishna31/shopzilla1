import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} added to cart successfully!`);
  };

  return (
    <div className="card m-3 shadow-sm" style={{ width: '18rem' }}>
      <img src={product.image} className="card-img-top" alt={product.name} style={{ height: '200px', objectFit: 'cover' }} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">${product.price}</p>
        <div className="d-flex justify-content-between">
          <Link to={`/product/${product._id}`} className="btn btn-outline-primary btn-sm">View Details</Link>
          <button onClick={handleAddToCart} className="btn btn-primary btn-sm">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

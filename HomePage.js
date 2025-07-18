import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { CartContext } from '../context/CartContext';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Products</h2>
      {loading ? (
        <Loader />
      ) : (
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;

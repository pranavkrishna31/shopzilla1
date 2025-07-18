import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <p className="text-center text-danger mt-5">❌ Product not found.</p>;

  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow p-4" style={{ maxWidth: '600px' }}>
        <h2 className="card-title text-center mb-3">{product.name}</h2>
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top mb-3"
          style={{ height: '300px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <p><strong>💵 Price:</strong> ${product.price}</p>
          <p><strong>📝 Description:</strong> {product.description}</p>
          <p><strong>📦 In Stock:</strong> {product.countInStock}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

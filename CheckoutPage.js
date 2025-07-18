import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.item;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/payment', { state: { user: formData, product } });
  };

  return (
    <div className="container my-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Checkout</h2>

        {product && (
          <div className="d-flex align-items-center border p-3 mb-4 rounded bg-light">
            <img
              src={product.image}
              alt={product.name}
              className="img-thumbnail me-3"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            <div>
              <h5 className="mb-1">{product.name}</h5>
              <p className="mb-0 text-muted">Price: ${product.price}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              name="name"
              className="form-control"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              name="email"
              className="form-control"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              name="phone"
              className="form-control"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              name="address"
              className="form-control"
              placeholder="Shipping Address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="3"
            />
          </div>
          <button type="submit" className="btn btn-dark w-100">
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;

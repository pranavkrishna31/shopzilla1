import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = (item) => {
    navigate('/checkout', { state: { item } });
  };

  const getTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-muted">Your cart is empty.</p>
      ) : (
        <>
          <div className="row g-4">
            {cartItems.map((item, index) => (
              <div className="col-md-6" key={index}>
                <div className="card h-100 shadow-sm">
                  <div className="row g-0">
                    <div className="col-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded-start"
                        style={{ height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="col-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text mb-1">Price: ${item.price}</p>
                        <p className="card-text mb-3">Quantity: 1</p>
                        <div className="d-flex flex-wrap gap-2">
                          <button
                            className="btn btn-dark btn-sm"
                            onClick={() => handleCheckout(item)}
                          >
                            Proceed to Checkout
                          </button>
                          <button className="btn btn-outline-secondary btn-sm">
                            Move to Wishlist
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => removeFromCart(item)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-end">
            <h4 className="fw-bold">Total Price: ${getTotal()}</h4>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;

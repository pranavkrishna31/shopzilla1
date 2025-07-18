import React, { useEffect, useState } from 'react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error('Error fetching orders:', err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Your Orders</h2>

      {orders.length === 0 ? (
        <div className="alert alert-info text-center">No orders placed yet.</div>
      ) : (
        <div className="row">
          {orders.map((order, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title mb-3">Order #{index + 1}</h5>
                  <p><strong>Name:</strong> {order.user.name}</p>
                  <p><strong>Phone:</strong> {order.user.phone}</p>
                  <p><strong>Payment:</strong> {order.user.paymentMethod}</p>
                  <p><strong>Placed On:</strong> {new Date(order.createdAt).toLocaleString()}</p>

                  <h6 className="mt-3">Items:</h6>
                  <ul className="list-group list-group-flush">
                    {order.items.map((item, i) => (
                      <li key={i} className="list-group-item d-flex justify-content-between">
                        <span>{item.name}</span>
                        <span>${item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;

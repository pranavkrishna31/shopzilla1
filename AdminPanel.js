import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    countInStock: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE'
      });
      setProducts(products.filter(p => p._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });

      const data = await res.json();
      setProducts([...products, data]);
      setNewProduct({ name: '', price: '', image: '', description: '', countInStock: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Admin Panel</h2>

      {/* Add New Product Form */}
      <div className="card p-4 mb-5 shadow">
        <h4>Add New Product</h4>
        <form onSubmit={handleAdd}>
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={newProduct.price}
                onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Image URL"
                value={newProduct.image}
                onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={newProduct.description}
                onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                required
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="In Stock"
                value={newProduct.countInStock}
                onChange={e => setNewProduct({ ...newProduct, countInStock: e.target.value })}
                required
              />
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary w-100">Add</button>
            </div>
          </div>
        </form>
      </div>

      {/* Products Table */}
      <h4>Product List</h4>
      <div className="table-responsive">
        <table className="table table-bordered align-middle shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price ($)</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={product._id}>
                <td>{idx + 1}</td>
                <td>
                  <img src={product.image} alt={product.name} width="60" height="60" style={{ objectFit: 'cover' }} />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.countInStock}</td>
                <td>{product.description}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-info me-2"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;

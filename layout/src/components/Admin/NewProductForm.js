import React from "react";

export const NewProductForm = () => {
  return (
    <main id="main" className="addProduct">
      <h3>Add a product</h3>
      <div className="form">
        <form
          action="http://localhost:5000/api/product/add"
          method="POST"
          enctype="multipart/form-data"
        >
          <div className="form-group">
            <label for="name">Product name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              required="true"
            />
          </div>
          <div className="form-group">
            <label for="description">Product description</label>
            <input
              type=""
              className="form-control"
              name="description"
              id="description"
              required="true"
            />
          </div>
          <div className="form-group">
            <label for="price">Product price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              id="price"
              required="true"
            />
          </div>
          <div className="form-group">
            <label for="brand">Product brand</label>
            <input
              type="text"
              className="form-control"
              name="brand"
              id="brand"
              required="true"
            />
          </div>
          <div className="form-group">
            <label for="category">Product category</label>
            <input
              type="text"
              className="form-control"
              name="category"
              id="category"
              required="true"
            />
          </div>
          <div className="form-btn">
            <input
              type="submit"
              className="btn btn-primary"
              name="submit"
              value="Add product"
            />
          </div>
        </form>
      </div>
    </main>
  );
};

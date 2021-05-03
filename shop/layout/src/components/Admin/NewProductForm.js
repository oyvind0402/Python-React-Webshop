import React from "react";

export const NewProductForm = () => {
  return (
    <div id="main" class="addProduct">
      <h3>Add a product</h3>
      <div class="form">
        <form
          action="http://localhost:5000/api/product/add"
          method="POST"
          enctype="multipart/form-data"
        >
          <div class="form-group">
            <label for="name">Product name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="name"
              required="true"
            />
          </div>
          <div class="form-group">
            <label for="description">Product description</label>
            <input
              type=""
              class="form-control"
              name="description"
              id="description"
              required="true"
            />
          </div>
          <div class="form-group">
            <label for="price">Product price</label>
            <input
              type="number"
              class="form-control"
              name="price"
              id="price"
              required="true"
            />
          </div>
          <div class="form-group">
            <label for="brand">Product brand</label>
            <input
              type="text"
              class="form-control"
              name="brand"
              id="brand"
              required="true"
            />
          </div>
          <div class="form-group">
            <label for="category">Product category</label>
            <input
              type="text"
              class="form-control"
              name="category"
              id="category"
              required="true"
            />
          </div>
          <div class="form-btn">
            <input
              type="submit"
              class="btn btn-primary"
              name="submit"
              value="Add product"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

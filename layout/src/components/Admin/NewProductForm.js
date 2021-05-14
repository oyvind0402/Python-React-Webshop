import React, { useEffect, useState } from "react";

export const NewProductForm = () => {
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("admin")) {
      setAdmin(true);
    }
  }, []);

  if (admin) {
    return (
      <main id="main" className="addProduct">
        <h3>Add a phone</h3>
        <div className="form">
          <form
            action="http://localhost:5000/api/product/add"
            method="POST"
            encType="multipart/form-data"
          >
            <div className="form-group">
              <label htmlFor="brand">Phone brand</label>
              <input
                type="text"
                className="form-control"
                name="brand"
                id="brand"
                required={true}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Phone name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                required={true}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Phone price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                id="price"
                required={true}
              />
            </div>
            <div className="form-group">
              <label htmlFor="color">Phone color</label>
              <input
                type="text"
                className="form-control"
                name="color"
                id="color"
                required={true}
              />
            </div>
            <div className="form-group">
              <label htmlFor="operatingsystem">Phone operatingsystem</label>
              <input
                type="text"
                className="form-control"
                name="operatingsystem"
                id="operatingsystem"
                required={true}
              />
            </div>
            <div className="form-group">
              <label htmlFor="storage">Phone storage</label>
              <input
                type="text"
                className="form-control"
                name="storage"
                id="storage"
                required={true}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">
                Phone image, not required (only .png files can be uploaded)
              </label>
              <input
                type="file"
                className="form-control"
                name="image"
                id="image"
              />
            </div>
            <div className="form-btn">
              <input
                type="submit"
                className="btn btn-primary"
                name="submit"
                value="Add phone"
              />
            </div>
          </form>
        </div>
      </main>
    );
  } else {
    return <div>You do not have admin privileges...</div>;
  }
};

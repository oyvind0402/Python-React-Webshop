import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { Link } from "react-router-dom";

export const NewProductForm = () => {
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("admin")) {
      setAdmin(true);
    }
  }, []);

  async function addPhone() {
    const data = new FormData();
    const brand = document.getElementById("brand").value;
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const color = document.getElementById("color").value;
    const operatingsystem = document.getElementById("operatingsystem").value;
    const storage = document.getElementById("storage").value;
    const image = document.getElementById("image").files[0];
    data.append("brand", brand);
    data.append("name", name);
    data.append("price", price);
    data.append("color", color);
    data.append("operatingsystem", operatingsystem);
    data.append("storage", storage);
    data.append("image", image);

    let response = await fetch("https://localhost:5000/api/product/add", {
      method: "POST",
      header: {
        Authorization: "AWdad12e+1daw::d1__123123dadaodo",
        "Content-type": "multipart/form-data",
      },
      body: data,
    });
    const reply = await response.json();
    console.log(reply);

    if (response.status === 201) {
      alert(JSON.stringify(reply["msg"]));
    } else {
      alert(JSON.stringify(reply["msg"]));
    }
  }

  if (admin) {
    return (
      <>
        <Header />

        <main id="main" className="addProduct">
          <Link to="/admin">Back to admin</Link>
          <h3>Add a phone</h3>
          <div className="form">
            <form onSubmit={addPhone}>
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
                  type="number"
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
      </>
    );
  } else {
    return (
      <>
        <Header />
        <main id="main">
          <p>You do not have admin privileges...</p>
        </main>
      </>
    );
  }
};

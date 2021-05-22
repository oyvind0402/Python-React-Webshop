import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "../Header/Header";

const UpdateProductPage = () => {
  const [admin, setAdmin] = useState(false);
  const [product, updateProduct] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("admin")) {
      setAdmin(true);
    }
    const loadData = async () => {
      const link = window.location.href;
      const id = link.split("/")[4];
      const apiLink = "https://localhost:5000/api/product/" + id;

      const response = await fetch(apiLink);
      let data = await response.json();
      updateProduct(data);
    };
    loadData();
  }, []);

  async function updatePhone(event) {
    event.preventDefault();

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

    const link = window.location.href;
    const id = link.split("/")[4];
    const response = await fetch(
      "https://localhost:5000/api/product/update/" + id,
      {
        method: "POST",
        header: {
          Authorization: "AWdad12e+1daw::d1__123123dadaodo",
          "Content-type": "multipart/form-data",
        },
        body: data,
      }
    );
    const reply = await response.json();
    console.log(reply);

    if (response.status === 201) {
      const apiLink = `https://localhost:5000/api/product/${id}`;
      const response2 = await fetch(apiLink);
      let data2 = await response2.json();
      updateProduct(data2);
      alert(JSON.stringify(reply["msg"]));
    } else {
      alert(JSON.stringify(reply["msg"]));
    }
  }

  const src = "data:image/png;base64, " + product["image"];

  if (admin) {
    return (
      <>
        <Header />
        <main id="main">
          <Link to="/admin">Back to admin</Link>
          <h3>Update a phone</h3>
          <div className="form">
            <form onSubmit={updatePhone}>
              <div className="form-group">
                <label htmlFor="brand">Phone brand</label>
                <input
                  type="text"
                  className="form-control"
                  name="brand"
                  id="brand"
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Phone name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Phone price</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  id="price"
                />
              </div>
              <div className="form-group">
                <label htmlFor="color">Phone color</label>
                <input
                  type="text"
                  className="form-control"
                  name="color"
                  id="color"
                />
              </div>
              <div className="form-group">
                <label htmlFor="operatingsystem">Phone operatingsystem</label>
                <input
                  type="text"
                  className="form-control"
                  name="operatingsystem"
                  id="operatingsystem"
                />
              </div>
              <div className="form-group">
                <label htmlFor="storage">Phone storage</label>
                <input
                  type="number"
                  className="form-control"
                  name="storage"
                  id="storage"
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">
                  Phone image (only .png files can be uploaded)
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
                  value="Update phone"
                />
              </div>
            </form>
          </div>
          <article className="prodcard">
            <h3 className="prodcard-name">
              {product["brand"] + " " + product["name"]}
            </h3>
            <img className="prodcard-img" src={src} alt={product["name"]} />
            <p className="prodcard-desc">{product["short_desc"]}</p>
            <p className="prodcard-price">{product["price"]}</p>
          </article>
        </main>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <main id="main">
          <p>You dont have admin privileges...</p>
        </main>
      </>
    );
  }
};

export default UpdateProductPage;

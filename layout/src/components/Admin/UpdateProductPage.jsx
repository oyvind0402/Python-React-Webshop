import React, { useState, useEffect } from "react";
import { formatNOK } from "../utils";
import { Link, useHistory } from "react-router-dom";
import { Header } from "../Header/Header";
import { ErrorNoPrivileges } from "./ErrorNoPrivileges";

const UpdateProductPage = () => {
  const [admin, setAdmin] = useState(false);
  const [product, updateProduct] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("admin")) {
      setAdmin(true);
    }
    const loadData = async () => {
      const link = window.location.href;
      const id = link.split("/")[4];
      const apiLink = "https://localhost:5000/api/product/" + id;

      const response = await fetch(apiLink);
      if (response.status === 200) {
        let data = await response.json();
        updateProduct(data);
      } else {
        history.push("/404");
      }
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

  const autoUpdate = (field, value) => {
    switch (field) {
      case "price":
        value = parseInt(value);
        if (!isNaN(value)) {
          document.getElementById("updateCard-" + field).innerHTML = formatNOK(
            value
          );
          break;
        } else {
          document.getElementById("updateCard-" + field).innerText = "ERROR";
          break;
        }
      case "name":
      case "brand":
        document.getElementById("updateCard-" + field).innerText = value;
        document.getElementById("updateCard-desc").innerText =
          "Description will be updated on save";
        break;
      default:
        document.getElementById("updateCard-" + field).innerText = value;
        break;
    }
  };

  const src = "data:image/png;base64, " + product["image"];

  if (admin) {
    return (
      <>
        <Header />
        <main id="main">
          <p>
            <Link to="/update" className="btn btn-secondary">
              Back to Update Products page
            </Link>
          </p>
          <Link to="/admin" className="btn btn-secondary">
            Back to Admin Page
          </Link>
          <h2>Update a phone</h2>
          <div className="updateOnePhone">
            <div className="form">
              <form onSubmit={updatePhone}>
                <div className="form-group">
                  <label htmlFor="brand">Brand</label>
                  <input
                    type="text"
                    className="form-control"
                    name="brand"
                    id="brand"
                    defaultValue={product["brand"]}
                    onChange={(e) => autoUpdate(e.target.id, e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Phone name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    defaultValue={product["name"]}
                    onChange={(e) => autoUpdate(e.target.id, e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    id="price"
                    defaultValue={product["price"]}
                    onChange={(e) => autoUpdate(e.target.id, e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="color">Color</label>
                  <input
                    type="text"
                    className="form-control"
                    name="color"
                    id="color"
                    defaultValue={product["color"]}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="operatingsystem">Operating System</label>
                  <input
                    type="text"
                    className="form-control"
                    name="operatingsystem"
                    id="operatingsystem"
                    defaultValue={product["operatingsystem"]}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="storage">Storage (Gb)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="storage"
                    id="storage"
                    defaultValue={product["storage"]}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="image">
                    Image (.png) <br />
                    <span className="form-note">*Not required</span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    id="image"
                    accept=".png"
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
            <div id="updateCard">
              <div className="prodcard">
                <h3 className="prodcard-name">
                  <span id="updateCard-brand">{product["brand"]}</span>{" "}
                  <span id="updateCard-name">{product["name"]}</span>
                </h3>
                <img className="prodcard-img" src={src} alt={product["name"]} />
                <p id="updateCard-desc" className="prodcard-desc">
                  {product["short_desc"]}
                </p>
                <p id="updateCard-price" className="prodcard-price">
                  {formatNOK(product["price"])}
                </p>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <ErrorNoPrivileges />
      </>
    );
  }
};

export default UpdateProductPage;

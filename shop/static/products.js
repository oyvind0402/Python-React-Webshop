function render_products(data) {
  document.getElementById("product-brand").innerHTML =
    "Brand: " + data[0]["brand"];

  document.getElementById("product-name").innerHTML =
    "Name: " + data[0]["name"];

  document.getElementById("product-price").innerHTML =
    "Price: " + data[0]["price"];

  document.getElementById("product-color").innerHTML =
    "Color: " + data[0]["color"];

  document.getElementById("product-os").innerHTML =
    "OS: " + data[0]["operatingsystem"];

  document.getElementById("product-storage").innerHTML =
    "Storage: " + data[0]["storage"];

  document.getElementById("product-shortdesc").innerHTML =
    "Short desc: " + data[0]["short_desc"];

  document.getElementById("product-longdesc").innerHTML =
    "Long desc: " + data[0]["long_desc"];

  let src = "data:image/png;base64, " + data[0]["image"];
  document.getElementById("product-image").src = src;
}

fetch("https://localhost:5000/api/products")
  .then((response) => response.json())
  .then((data) => render_products(data));

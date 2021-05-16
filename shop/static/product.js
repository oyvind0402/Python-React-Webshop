function render_product(data) {
  console.log(data);
}

fetch("https://localhost:5000/api/product/1")
  .then((response) => response.json())
  .then((data) => render_product(data));

function render_products(data) {
    for(i in data) {
      console.log(data[i])
    }
  }

  fetch("http://localhost:5000/api/products")
    .then(response => response.json())
    .then(data => render_products(data));

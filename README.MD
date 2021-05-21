1. Type 'docker-compose build' while in the root directory of the project to build the images from the three Dockerfiles and link them together.
2. Type 'docker-compose up' to start the three containers (the MySQL database, the React application and the flask API server).
3. Go to 'localhost:3001' to see the working webshop.

You need to delete the container to reset the database, if you so wish.
You can do that with 'docker-compose down'.
Then you follow steps 1 through 3 again to see the default state of our data.
The URL for the API is https://localhost:5000, it's https since its secured by a selfsigned SSL key pair.

Go to https://localhost:5000/api/users to see all users.
Go to https://localhost:5000/api/products to see all products. (It will look a bit weird because images are stored in its base64 encoding)

You can create an account - or you can decide not to, however you need one to create an order.

To log in as the admin - use the email "admin@admin.com" and the password "admin".

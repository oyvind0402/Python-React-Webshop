# DATA2410 - Portfolio Project 2: Webshop

This is a webshop created for the final exam in DATA2410 - Networking and Cloud Services.

## How to run

1. Use `$ docker-compose build` while in the root directory of the project to build the images from the three Dockerfiles and link them together, along with the Prometheus image.
2. Use `$ docker-compose up` to start the three containers (the MySQL database, the React application and the flask API server).
3. Go to [localhost:3001](http://localhost:3001) to see the working webshop.

If you encounter issues loading data, you may need to visit the [API](https://localhost:5000). You will see a warning about it being a potentially unsafe page, as it is self-certified. Accept accessing the unsafe API and navigate back to the [webshop](http://localhost:3001). The issue should be solved.

## Resetting the database

If you wish to reset the database, you need to delete the container. You can do that with `$ docker-compose down`.
To re-start the webshop, follow steps 1 through 3 from [How To Run](#how-to-run). Data will have been reset to its default state.

## API

The URL for the API is https://localhost:5000. It uses HTTPS since due to being secured by a self-signed SSL key pair.

Go to https://localhost:5000/api/users to see all users.

Go to https://localhost:5000/api/products to see all products.

## Website

The website has pages that can only be accessed through login as either a user or admin.

### Admin

To log in as the admin - use the email "admin@admin.com" and the password "admin".

The admin account allows you to create new products, and edit or delete existing ones.

### User

You may create a new user by pressing "Log in" in the header and the selecting "Sign up".

A user is required to see the user page, as well as complete an order.

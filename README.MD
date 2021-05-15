1. Type 'docker-compose build' while in the root directory of the project to build the images from the three Dockerfiles and link them together.
2. Type 'docker-compose up' to start the three containers (the MySQL database, the React application and the flask API server).
3. Go to 'localhost:3001' to see the working webshop.

You need to delete the container to reset the database, if you so wish.
You can do that with 'docker-compose down'.
Then you follow steps 1 through 3 again to see the default state of our data.

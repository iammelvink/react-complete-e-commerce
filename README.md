# react-complete-e-commerce

## Repository for my react-complete-e-commerce project

Find out how to build a complete e-commerce platform. Author Melvin Kisten tackles CRUD functions and connects the system to a database of MongoDB (Document database). Created a full-stack platform using JavaScript. The frontend was created using React and the backend was created using NodeJS, Express, MongoDB. Then I used Axios and Redux to link my backend with my frontend. I also used Postman to test my end points. 

1. Methodologies/Project Management:

   - Agile

2. Coding Practices:

   - OOP (Object Oriented Programming)
   - MVC (Model View Controller)

3. Programming Languages/Frameworks:
   - JavaScript
   - React
   - Redux
   - NodeJS
   - Express
   - MongoDB
   - Postman
   - Axios

## Live Demo

- [react-complete-e-commerce](https://react-complete-e-commerce.herokuapp.com/ "react-complete-e-commerce")

### Home Page

![Home Page](screenshots/home.png 'Home Page')

### Search Page

![Search Page](screenshots/search.png 'Search Page')

### Product Page

![Product Page](screenshots/product-screen.png 'Product Page')

### Cart Page

![Cart Page](screenshots/cart.png 'Cart Page')

### Place Order Page

![Place Order Page](screenshots/place-order.png 'Place Order Page')

### Make Payment Page

![Make Payment Page](screenshots/make-payment.png 'Make Payment Page')

### My Order Page

![My Order Page](screenshots/my-order-screen.png 'My Order Page')

### Admin Users Page

![Admin Users Page](screenshots/admin-users.png 'Admin Users Page')

### Admin Products Page

![Admin Products Page](screenshots/admin-products.png 'Admin Products Page')

### Admin Orders Page

![Admin Orders Page](screenshots/admin-orders.png 'Admin Orders Page')

## Instructions

1. Make sure you have these installed

   - [NodeJS](https://nodejs.org/en/download/ "NodeJS")
      - I used node version 14.15.3 and npm version 6.14.9 at time of creation
   - [MongoDB](https://www.mongodb.com/try/download/community "MongoDB")
      - I used mongo version 4.4.1 at time of creation
   - [Postman](https://www.postman.com/downloads/ "Postman")
      - I used postman version 7.36.1 at time of creation

2. Clone this repository into your local machine using the terminal (mac) or [Gitbash (PC)](https://git-scm.com/download/win "Gitbash (PC)")

   ```
   > git clone https://github.com/iammelvink/react-complete-e-commerce.git
   ```

3. backend setup (DO NOT cd to backend) (running on port you decide)

   ```
   > npm install
   ```

4. frontend setup (running on port 3000)
   ```
   > cd frontend
   ```

   ```
   > npm install
   ```

5. Insert data into the MongoDB database
   - Start MongoDB server
      ```
      > mongod
      ```

   - Enter mongo shell
      ```
      > mongo
      ```

   - Insert data into the MongoDB database
      ```
      > npm run data:import
      ```

6. Rename .env-example to .env
   and set these values
   ```
    NODE_ENV = development
    PORT = <>
    MONGO_URI = <>
    JWT_SECRET = <>
    PAYPAL_CLIENT_ID = <>
   
   ```
7. Runs both frontend and backend (cd to ROOT of project)
   ```
   > npm run dev
   ```

8. Enjoy!

## Deploy for production

1. Make sure you have created accounts at

   - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register "MongoDB Atlas")
   - [Heroku](https://signup.heroku.com/login "Heroku")

2. Then follow ALL step by step

   MongoDB:

   Logging into remote MongoDB server (may need to change the url,
   as well as in backend/src/server.js)

   ```
   > mongo "mongodb+srv://<cluster_name>.mongodb.net/<dbname>" --username <username>
   ```

   Inserting data into remote MongoDB database

   ```
   > npm run data:import
   ```

   Heroku:

   Installing Heroku using npm globally

   ```
   > npm install -g heroku
   ```

   Logging into Heroku

   ```
   > heroku login
   ```

   Creating a heroku app

   ```
   > heroku create
   ```

   Create .gitignore file
   Add this

   ONLY in entire file

   ```
   ## Dependency directories
   node_modules/
   ```

   OR

   ```
   Remove 'dist' and 'build' from .gitignore file
   ```

   ```
   > git init
   ```

   ```
   > heroku git:remote -a <app name>
   ```

   ```
   > git add .
   ```

   ```
   > git commit -am "initial commit"
   ```

   ```
   > git push heroku master
   ```
   ```

   OR

   ```   
   ```
   > git push --set-upstream heroku master
   ```
   ```

   OR

   ```   
   ```
   > git push heroku
   ```

   Setting environment variables

   ```
   > heroku config:set NODE_ENV=production -a <app name>
   ```

   ```
   > heroku config:set PORT=<> -a <app name>
   ```

   ```
   > heroku config:set MONGO_URI='<entire_uri+password>' -a <app name>
   ```

   ```
   > heroku config:set JWT_SECRET='<secret>' -a <app name>
   ```

   ```
   > heroku config:set PAYPAL_CLIENT_ID='<id>' -a <app name>
   ```

   ```
   > heroku ps:scale web=1
   ```

## More Stuff

Check out some other stuff on [Melvin K](https://github.com/iammelvink "Melvin K GitHub page").

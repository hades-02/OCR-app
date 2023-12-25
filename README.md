
# Qoala OCR app

A web app which uses Google Vision API to extract data from Thai ID card and store this record in a database. This app can also manage these records, i.e perform CRUD operations using a backend API which is developed using NodeJs, Express, MongoDB and Mongoose.
ReactJs is used to develop the frontend of this application.




## Demo

Website Link: https://qoala-ocr-25f72.web.app/


## Deployment

Frontend is deployed using firebase hosting.

Backend is deployed using render service.


## Run on local environment

Download the project and follow these steps:

Open the project using VS code and run these commands in terminal

Step: 1
```bash
  npm install
```
Step: 2 To start frontend, navigate to Frontend directory and run
```bash
  npm run dev
```
Step: 3 To start backend server, add a config.env file and add all the below specified environment variables with your urls or keys. Then run.

```bash
  npm start
```
After this app will be ready to run on your local environment.
## Environment Variables

To run this project, you will need to add the following environment variables to your config.env file

`NODE_ENV` with value development or production

`PORT` port on which you to run the server

`DATABASE` database URL of mongoDB cloud atlas project

`DATABASE_PASSWORD` password of your database to replace with <password> in your database URL

And make sure to add IP address from which you will be sending requests in your mongoDB atlas network access list.

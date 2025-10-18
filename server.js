const express = require('express')
const path = require("path");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const database = require("./config/database")
const route = require("./routes/client/index.router");
require('dotenv').config()
const methodOverride = require("method-override");


const app = express()


database.connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000

app.use(methodOverride("_method"));   



app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));





route(app);

app.use(express.static(`${__dirname}/public`));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
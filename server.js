const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const router = require("./src/router/router");
const { connection } = require("./db");

app.use(cors());
app.use("/", router);

function run() {
  try {
    connection.connect((err) => {
      if (err) {
        console.log("failled to connect to mysql database");
      } else {
        console.log("database connection successfull");
      }
    });
    //create table
    connection.query(
      "create table if not exists user(id int primary key,first_name varchar(20),last_name varchar(15),email varchar(55))"
    );
    console.log("table created");

    app.listen(process.env.port, () => {
      console.log(`server listenig at port ${process.env.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
run();

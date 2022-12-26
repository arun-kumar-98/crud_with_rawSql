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

async function run() {
  try {
    connection.connect((err) => {
      if (err) {
        console.log("failled to connect to mysql database");
      } else {
        console.log("database connection successfull");
      }
    });
    //create table
    // "create table if not exists profile(pid int primary key,status varchar(10),followers int,user_id int references user(id), constraint user_id unique(user_id))");

    await connection.query(`CREATE TABLE if not exists user(id int primary key,first_name VARCHAR(50)NOT NULL,last_name varchar(20)not null,email varchar(40) not null);
    create table if not exists profile(pid int primary key,status varchar(20),followers int,u_id int REFERENCES user(id), CONSTRAINT user_id UNIQUE (u_id))
`);

    app.listen(process.env.port, () => {
      console.log(`server listenig at port ${process.env.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
run();

// sudo kill -9 $(sudo lsof -t -i:4000)

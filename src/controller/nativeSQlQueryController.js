const CircularJSON = require("circular-json");
const { connection } = require("../../db");

const createSchema = async (req, res) => {
  try {
    const createTable = await connection.query(
      "create table user(id int primary key,first_name varchar(20),last_name varchar(15),email varchar(55))"
    );
    console.log(createTable);
  } catch (error) {
    console.log(error);
  }
};

const insertRecord = async (req, res) => {
  try {
    let query = `insert into user(id,first_name,last_name,email) values(${req.body.id},'${req.body.first_name}','${req.body.last_name}','${req.body.email}')`;
    const recordResponse = await connection.query(query);
    // console.log(recordResponse)
    const resp = CircularJSON.stringify(recordResponse);
    res.send(JSON.parse(resp));
  } catch (err) {
    console.log(err);
    res.status(400).json({ response: null });
  }
};

const getAllRecord = async (req, res) => {
  try {
    let query = "select * from user";
    await connection.query(query, function (err, resp) {
      if (err) throw err;
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
    res.send(null);
  }
};

const updateRecord = async (req, res) => {
  try {
    let query = `update user set first_name='${req.body.first_name}',last_name='${req.body.last_name}',email='${req.body.email}' where id=${req.body.id}`;
    await connection.query(query, (err, resp) => {
      if (err) throw err;
      res.send(resp);
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const deleteParticularRecord = async (req, res) => {
  try {
    let query = ` delete from user where id=${req.params.id}`;
    console.log(query);
    connection.query(query, (err, resp) => {
      if (err) throw err;
      console.log("record deleted ");
      res.send(resp);
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const deleteAllRecord = async (req, res) => {
  try {
    let query = ` delete from user `;
    console.log(query);
    connection.query(query, (err, resp) => {
      if (err) throw err;
      console.log("record deleted ");
      res.send(resp);
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

/***
 * TODO:
 * 1.BULK INSERTION
 * 2.CREATE OR DROP API
 *
 * */

const multipleRecordInsertion = async (req, res) => {
  try {
    const bodyData = req.body;

    const record = [];
    bodyData.map((each) => {
      const item = [
        (id = each.id),
        (first_name = each.first_name),
        (last_name = each.last_name),
        (email = each.email),
      ];

      record.push(item);
    });

    console.log(record);

    let query = `insert into user(id,first_name,last_name,email) values ?`;
    const resp = connection.query(query, [record]);
    console.log(resp);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

/**
 * TODO:
 * 1.BULK UPDATE QUERY
 * 2.BASIC JOIN
 */

const bulkUpdate = async (req, res) => {
  try {
    const bodyData = req.body;
    console.log(bodyData);
    const record = [];
    bodyData.map((each) => {
      const item = [
        (id = each.id),
        (first_name = each.first_name),
        (email = each.email),
      ];

      record.push(item);
    });
    record.forEach((element) => {
      console.log(" =-========- "+element);
      let query = `update user set first_name='${element[1]}',email='${element[2]}' where id=${element[0]}`;
      connection.query(query, (err, resp) => {
        if (err) throw err;
        console.log(resp);
        res.send(resp);
      });
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = {
  createSchema,
  insertRecord,
  getAllRecord,
  updateRecord,
  deleteParticularRecord,
  deleteAllRecord,
  multipleRecordInsertion,
  bulkUpdate,
};

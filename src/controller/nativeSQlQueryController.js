const CircularJSON = require("circular-json");
const { response } = require("express");
const { connection } = require("../../db");
const { use } = require("../router/router");

const createSchema = async (req, res) => {
  try {
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
 * TODO:https://www.thunderclient.com/welcome
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
      //www.thunderclient.com/welcome
      https: record.push(item);
    });
    record.forEach((element) => {
      console.log(" =-========- " + element);
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

/**
 *
 *
 * TODO:
 *  ONE TO ONE
 * ------------
 * 1.create table
 * 2.insert one
 * 3.insert many
 * 4.update one
 * 5.update many
 * 6.delete one
 * 7.delete many
 *
 * JOIN
 * 2.
 *
 *
 */

const oneToOneMappingRecordInsertion = async (req, res) => {
  try {
    let query = `insert into user(id,first_name,last_name,email) values(${req.body.id},'${req.body.first_name}','${req.body.last_name}','${req.body.email}');
    insert into profile(pid,status,followers,u_id) values(${req.body.pid},'${req.body.status}',${req.body.followers},${req.body.u_id})`;

    const resp = await connection.query(query, (err, resp) => {
      if (err) throw err;
      console.log(resp);
    });
    if (resp) {
      res.send("data inserted successfully");
    } else {
      res.send("failled to insert data");
    }
  } catch (error) {
    console.log(error);
    res.send("something went wrong!");
  }
};

/**
 * insert bulk record in mapped table
 *
 */

const oneToOneMappingRecordBulkInsertion = async (req, res) => {
  try {
    const bodyData = req.body;
    console.log(bodyData);

    const record = [];
    const child = [];
    bodyData.map((each) => {
      const item = [
        (id = each.id),
        (first_name = each.first_name),
        (last_name = each.last_name),
        (email = each.email),
      ];
      const ch = [
        (pid = each.pid),
        (status = each.status),
        (followers = each.followers),
        (u_id = each.u_id),
      ];
      child.push(ch);
      record.push(item);
    });
    console.log(child);

    const query = `insert into user values ?;
    insert into profile values ?`;
    const resp = connection.query(query, [record, child], (err, resp) => {
      if (err) throw err;
      if (resp) {
        res.send("data inserted successfully ");
      } else {
        res.send("failled to insert ");
      }
    });
  } catch (error) {
    console.log(error);
    res.send("something went wrong !");
  }
};

//fetch single record

const fetchSinleRecordInJoinTable = async (req, res) => {
  try {
    const query = `select * from user  as u inner join  profile as p on u.id=p.u_id`;
    connection.query(query, (err, resp) => {
      if (err) throw err;
      res.send(resp);
    });
  } catch (error) {
    console.log(error);
    res.send("something went wrong !");
  }
};

//NORMAL JOIN
const fetchRecord = async (req, res) => {
  try {
    const query = `select * from user as u,profile as p where u.id=${req.body.id} and p.u_id=${req.body.u_id}`;
    connection.query(query, (err, resp) => {
      if (err) throw err;
      if (resp) {
        res.send(resp);
      } else {
        res.send("record does not exists");
      }
    });
  } catch (error) {
    console.log("something went wrong");
  }
};

/**
 * 
 * TODO:
 *1Q.SIMPLE JOIN SELECT
 2Q.UPDATE
 */

const updateJoinTable = async (req, res) => {
  try {
    const query = `update user u inner join profile p on u.id=${req.body.id} and p.u_id=${req.body.u_id} set u.first_name='${req.body.first_name}',p.status='${req.body.status}'`;
    // execute query

    connection.query(query, (err, resp) => {
      if (err) throw err;
      if (resp) {
        res.send(resp);
      } else {
        res.send("failled to update record");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//DELETE RECORD

const deleteData = async (req, res) => {
  const query = `delete user,profile from user INNER JOIN profile ON profile.u_id=user.id where user.id=${req.body.id}`;

  connection.query(query, (err, resp) => {
    if (err) throw err;
    if (resp) {
      res.send(resp);
    } else {
      res.send("faille to delete record !");
    }
  });
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
  oneToOneMappingRecordInsertion,
  oneToOneMappingRecordBulkInsertion,
  fetchSinleRecordInJoinTable,
  fetchRecord,
  updateJoinTable,
  deleteData,
};

"user strict";

const express = require("express");
const router = express.Router();
const uuid = require("uuid/v1");
var bcrypt = require("bcryptjs");
const db = require("../config/database");
const jwt = require('jsonwebtoken');

router.post("/add", async (req, res) => {
  let { name, email, no_handphone,bike_name } = req.body;
  let id = uuid();
  try {
    if(name == null || email == null || no_handphone == null || bike_name == null ||
      name == "" || email == "" || no_handphone == "" || bike_name == ""
      ){
        throw {
          status: 400,
          message: 'data tidak lengkap'
        }
    }
    var conn = await db.getConnection();
    //check email
    let qr_code = ""
    let [count] = await conn.query('SELECT count(id) total FROM bike_data WHERE no_handphone=? ',[no_handphone]);

    if(count[0].total > 0){
      qr_code = `${no_handphone}_${count[0].total+1}`
    }else {
      qr_code = no_handphone+'_'+'1'
    }

    let insert = await conn.query('INSERT INTO bike_data (id,name,bike_name,no_handphone,qr_code,email) VALUES (:id,:name,:bike_name,:no_handphone,:qr_code,:email)',
    {
      id,
      name,
      bike_name,
      no_handphone,
      qr_code,
      email
    })
    conn.release()
    res.status(201).json({
      message: 'new bike added',
      data: {
        name,email,no_handphone,bike_name
      }
    })
  } catch (error) {
    console.log(error);
    conn && conn.release()
    res.status(error.status || 500).json({ message: error.message } || error);
  }
});

module.exports = router;

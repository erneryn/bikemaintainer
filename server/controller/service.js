"user strict";

const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
var bcrypt = require("bcryptjs");
const db = require("../config/database");
const jwt = require('jsonwebtoken');

router.post("/add", async (req, res) => {
  let { bike_id,part_change,action,notes } = req.body;
  console.log(req.body)
  let id = uuidv4();
  try {
    if(bike_id == "" || bike_id == null){
        throw {
            status : 400,
            message: "bike id harus ada"
        }
    }
    if(action == "" || action == null){

        throw {
            status : 400,
            message: "action harus di isi"
        }
    }
    var conn = await db.getConnection();
 

    let insert = await conn.query('INSERT INTO service_history (id,bike_id,part_change,action,notes) VALUES (:id,:bike_id,:part_change,:action,:notes)',
    {
        id,
        bike_id,
        part_change,
        action,
        notes
    })
    conn.release()
    res.status(201).json({
      message: 'new service data added',
    })
  } catch (error) {
    console.log(error);
    conn && conn.release()
    res.status(error.status || 500).json({ message: error.message } || error);
  }
});



module.exports = router;

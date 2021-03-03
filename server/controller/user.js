"user strict";

const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
var bcrypt = require("bcryptjs");
const db = require("../config/database");
const jwt = require('jsonwebtoken');
const auth = require('./middleware/authentication');

router.post("/register", async (req, res) => {
  let { name, email, phone_number, password } = req.body;
  let id = uuidv4();

  try {
    var conn = await db.getConnection();
    //check email
    let [avail] = await conn.query('SELECT email FROM user where email=?',[email])
    if(avail.length > 0){
      throw {
          status: 400,
          message: `email ${email} already exists`
      }
    } else {
        let salt = await bcrypt.genSalt(10);
        let hashPassword = bcrypt.hashSync(password, salt);
        let query =
        "INSERT INTO user (id,name,email,phone_number,password) VALUES (:id,:name,:email,:phone_number,:password)";
        let params = {
            id,
            name,
            email,
            phone_number,
            password: hashPassword,
        };
        
        let [row] = await conn.execute(query, params);
        conn.release();
        res.status(201).json({
            data: {
                name,
                email,
                phone_number,
            },
            mesaage: "succesfully register new user",
        });
    }
  } catch (error) {
    console.log('/register ||',error);
    conn && conn.release()
    res.status(error.status || 500).json({ message: error.message } || error);
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    var conn = await db.getConnection()
    let [find] = await conn.execute("SELECT email,password FROM user where email=?",[email])
    if(find.length > 0){
        if(bcrypt.compareSync(password, find[0].password)){
          console.log('berhasil')
            res.status(200).json({
                message: 'Login Berhasil',
                token: jwt.sign({
                    email,
                    password
                },process.env.SECRET_KEY)
            })
        }else {
            throw {
                status: 404,
                message : 'Password Wrong'
            }
        }
    }else {
        throw {
            status: 404,
            message : 'Email Not Found'
        }
    }
    console.log('/login || BERHASIL')
    conn.release()
  } catch (error) {
    conn && conn.release()
    res.status(error.status || 500).json({ message: error.message } || error);
  }
});

router.post('/check_auth',auth,(req,res,next)=>{
  console.log('ss')
  res.status(200).json({
    mesaage: 'Authenticated'
  })
})

module.exports = router;

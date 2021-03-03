"user strict";

const express = require("express");
const router = express.Router();
// const uuid = require('uuid').v1();
const { v4: uuidv4 } = require('uuid');
var bcrypt = require("bcryptjs");
const db = require("../config/database");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/authentication");
const AWS = require('aws-sdk');
const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

const Storage = multer.memoryStorage({
  destination: (req,file,cb)=>{
    cb(null,'')
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: Storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter:fileFilter
});

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET
})


router.post("/get", auth, async (req, res) => {
  let name = req.body.name || null;
  let qr_code = req.body.qr_code || null;
  let no_handphone = req.body.no_handphone || null;
  let param_string = "";
  let params = {};
  if (name) {
    param_string = "name";
  } else if (qr_code) {
    param_string = "qr_code";
    params.qr_code = qr_code;
  } else if (no_handphone) {
    param_string = "no_handphone";
    params.no_handphone = no_handphone;
  }

  try {
    var conn = await db.getConnection();
    let query = "";
    if (param_string == "") {
      query =
        "SELECT id,name,bike_name,no_handphone,qr_code,email,COALESCE(url_image,'') url_image, history.tanggal FROM bike_data bd LEFT JOIN ( SELECT MAX(DATE_FORMAT(created,'%d %M %Y')) tanggal, bike_id FROM service_history sh GROUP BY bike_id ) history ON history.bike_id = bd.id";
    } else if (param_string == "name") {
      query =
        "SELECT id,name,bike_name,no_handphone,qr_code,email,COALESCE(url_image,'') url_image, history.tanggal FROM bike_data bd LEFT JOIN ( SELECT MAX(DATE_FORMAT(created,'%d %M %Y')) tanggal, bike_id FROM service_history sh GROUP BY bike_id ) history ON history.bike_id = bd.id WHERE name LIKE '%" +
        name +
        "%';";
    } else {
      query =
        "SELECT id,name,bike_name,no_handphone,qr_code,email,COALESCE(url_image,'') url_image, history.tanggal FROM bike_data bd LEFT JOIN ( SELECT MAX(DATE_FORMAT(created,'%d %M %Y')) tanggal, bike_id FROM service_history sh GROUP BY bike_id ) history ON history.bike_id = bd.id WHERE " +
        param_string +
        "=:" +
        param_string;
    }
    let [row] = await conn.execute(query, params);
    res.status(200).json({
      status: 200,
      message: "oke",
      data: row,
    });
    console.log("customer/get ||", req, res, row[0]);
  } catch (error) {
    conn && conn.release();
    res.status(error.status || 500).json({ message: error.message } || error);
  } finally {
    conn && conn.release();
  }
});

router.post("/add", auth, upload.single("bikeImage"), async (req, res) => {
  let { name, email, no_handphone, bike_name } = req.body;
  let id = uuidv4();
  const newFile = req.file.originalname.split('.')
  const fileType = newFile[newFile.length-1]

  const params = {
      Bucket : process.env.AWS_BUCKET_NAME,
      Key: `${uuidv4()}.${fileType}`,
      Body: req.file.buffer,
      ContentType: 'image/' + fileType,
      ACL:'public-read'
  }
  try {
    if (
      name == null ||
      email == null ||
      no_handphone == null ||
      bike_name == null ||
      name == "" ||
      email == "" ||
      no_handphone == "" ||
      bike_name == ""
    ) {
      throw {
        status: 400,
        message: "data tidak lengkap",
      };
    }
    var conn = await db.getConnection();
    //check email
    let qr_code = "";
    let [
      count,
    ] = await conn.execute(
      "SELECT count(id) total FROM bike_data WHERE no_handphone=? ",
      [no_handphone]
    );

    if (count[0].total > 0) {
      qr_code = `${no_handphone}_${count[0].total + 1}`;
    } else {
      qr_code = no_handphone + "_" + "1";
    }

    var urlImg= ""
  const Upload = await new Promise((resolve,reject)=>{
    s3.upload(params,(err,data)=>{
      if(err){
        reject({error: err, message: 'error'})
      }else {
        resolve({message: 'ok', data})
      }
    })
  })
  if(Upload.message = 'ok'){

    let insert = await conn.execute(
      "INSERT INTO bike_data (id,name,bike_name,no_handphone,qr_code,email,url_image) VALUES (:id,:name,:bike_name,:no_handphone,:qr_code,:email,:url_image)",
      {
        id,
        name,
        bike_name,
        no_handphone,
        qr_code,
        email,
        url_image: Upload.data.Location
      }
      );
    }
      conn.release();
    res.status(201).json({
      message: "new bike added",
      data: {
        name,
        email,
        no_handphone,
        bike_name,
        url_image: Upload.data.Location
      },
    });
  } catch (error) {
    console.log(error);
    conn && conn.release();
    res.status(error.status || 500).json({ message: error.message } || error);
  }
});

router.put("/edit", auth, async (req, res) => {
  let { id, name, email, no_handphone, bike_name } = req.body;
  try {
    if (
      name == null ||
      email == null ||
      no_handphone == null ||
      bike_name == null ||
      name == "" ||
      email == "" ||
      no_handphone == "" ||
      bike_name == ""
    ) {
      throw {
        status: 400,
        message: "data tidak lengkap",
      };
    }

    var conn = await db.getConnection();
    let params = { id, name, email, no_handphone, bike_name };
    let update = await conn.execute(
      "UPDATE bike_data SET name=:name,email=:email,no_handphone=:no_handphone,bike_name=:bike_name WHERE id=:id;",
      params
    );
    conn.release();
    res.status(201).json({
      status: 201,
      message: "ok updated",
    });
  } catch (error) {
    console.log(error);
    conn && conn.release();
    res.status(error.status || 500).json({ message: error.message } || error);
  }
});

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    let id = req.params.id;
    var conn = await db.getConnection();
    await conn.execute("DELETE FROM bike_data WHERE id=?", [id]);
    res.status(201).json({
      status: 201,
      message: "ok deleted",
    });
  } catch (error) {
    console.log(error);
    conn && conn.release();
    res.status(error.status || 500).json({ message: error.message } || error);
  }
});

module.exports = router;

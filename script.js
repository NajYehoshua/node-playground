const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcrypt");
const app = express();
const upload = multer();

let hash;

//! cors middleware to handle cors error
app.use(cors());

//! json middleware to handle json user payload
app.use(express.json());

//! urlencoded middleware to handle urlencoded data
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

//! Use multer to handle multi-form data
app.post("/", upload.fields([]), (req, res) => {
  //! get client data
  const { name, email, password } = req.body;

  //! bcrypt saltrounds
  const saltRounds = 10;

  //! hash password send it back to client
  bcrypt.hash(password, saltRounds).then((hashPassword) => {
    hash = hashPassword;

    res.status(200).json({ name, email, hashPassword });
  });
});

app.post("/login", upload.fields([]), (req, res) => {
  const { email, password } = req.body;

  //! compare plain password with hash password
  bcrypt.compare(password, hash).then((result) => {
    if (result) {
      return res.status(200).json({ email, msg: "User exist!" });
    } else {
      return res.status(400).json({ msg: "User does not exist!" });
    }
  });
});

const start = () => {
  app.listen(7000, () => {
    console.log("Server is up and running!");
  });
};

start();

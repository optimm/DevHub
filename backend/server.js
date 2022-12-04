require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;

//built in middeware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const start = async () => {
  try {
    // await connectDb();
    app.listen(port, () => {
      console.log(`Server for jobs is running on port ${port} `);
    });
  } catch (error) {
    console.log(error);
  }
};
start();

require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const port = process.env.PORT;

//built in middeware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// error handler middlewares
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//db
const connectDb = require("./db/connect");

//importing routers
const authRouter = require("./routes/auth");

//routes
app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/api/v1/auth", authRouter);

// error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDb();
    console.log("Connected to Database...\n");
    app.listen(port, () => {
      console.log(`Server for jobs is running on port ${port} `);
    });
  } catch (error) {
    console.log(error);
  }
};
start();

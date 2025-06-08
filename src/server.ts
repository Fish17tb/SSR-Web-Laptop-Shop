import express from "express";
import "dotenv/config";
import webRoute from "./routes/web";
import getConnection from "src/config/database";
import initDataFake from "./mock.data/seed";
import passport from "passport";
import configPassportLocal from "src/middleware/passport.local";

const port = process.env.PORT || 8888;

const app = express();

// config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

// config passport
app.use(passport.initialize());
configPassportLocal()

// config view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// config static file (public)
app.use(express.static("public"));

// declare routes
webRoute(app);

// connect database
getConnection();

//seeding data
initDataFake();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

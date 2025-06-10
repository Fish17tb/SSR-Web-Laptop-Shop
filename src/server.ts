import express from "express";
import "dotenv/config";
import webRoute from "./routes/web";
import getConnection from "src/config/database";
import initDataFake from "./mock.data/seed";
import passport from "passport";
import configPassportLocal from "src/middleware/passport.local";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";

const port = process.env.PORT || 8888;

const app = express();

// config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

// config session
app.use(
  session({
    // Cookie: thời gian hết hạn của sesstion
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

// config passport
app.use(passport.initialize());
app.use(passport.authenticate("session"));
configPassportLocal();

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

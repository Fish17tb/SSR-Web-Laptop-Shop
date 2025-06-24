// Triple-Slash Directives
/// <reference path="./types/index.d.ts" />

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

// Config req.body
app.use(express.json()); // For json
app.use(express.urlencoded({ extended: true })); // For form data

// Config session
app.use(
  session({
    // Cookie: thời gian hết hạn của sesstion
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    //Security key
    secret: "a santa at nasa",

    // Forces sesion save even if unchanged
    resave: false,

    // Saves unmodified sessions
    saveUninitialized: false,

    store: new PrismaSessionStore(new PrismaClient(), {
      // Clears expired sessions every 1 day
      checkPeriod: 1 * 24 * 60 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

// Config passport (create variable req.user)
app.use(passport.initialize());
app.use(passport.authenticate("session"));
configPassportLocal();

// Congfig globlal
app.use((req, res, next) => {
  res.locals.user = req.user || null; // Pass user object to all views
  next();
});

// Config view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Config static file (public)
app.use(express.static("public"));

// Declare routes
webRoute(app);

// Connect database
getConnection();

// Seeding data
initDataFake();

// Handle status 404
app.use((req, res) => {
  res.render("status/404.ejs");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

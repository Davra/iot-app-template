const http = require("http");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-oauth2").Strategy;
const request = require("request");
require("dotenv").config();

const TENANT_HOST = process.env.TENANT_HOST;
const TARGET_HOST = process.env.TARGET_HOST;
const SERVER_PORT = 8080;
const app = express();

const sess = {
  secret: 'keyboard cat',
  cookie: {},
};
app.use(session(sess));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

const pp = passport.initialize();
app.use(pp);
const ppSession = passport.session();
app.use(ppSession);

passport.serializeUser((user, cb) => {
  cb(null, JSON.stringify(user));
});

passport.deserializeUser((userSz, cb) => {
  if (!userSz) {
    return cb();
  }
  if (typeof userSz === "object") {
    return cb(null, userSz);
  }
  try {
    const userObj = JSON.parse(userSz);
    cb(null, userObj);
  } catch (err) {
    cb(err);
  }
});

const prodConfig = {
  authorizationURL: `https://${TENANT_HOST}/oauth/authorize`,
  tokenURL: `https://${TENANT_HOST}/oauth/token`,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: `https://${TARGET_HOST}/callback`,
  passReqToCallback: true,
};

/**
 * Enable on live
 */
const ensureTargetHost = (req, res, next) => {
  if (req.hostname !== TARGET_HOST) {
    res.redirect(301, "https://" + TARGET_HOST + req.url);
  } else {
    next();
  }
};

app.use(ensureTargetHost);

passport.use(
  new OAuth2Strategy(
    prodConfig,
    (req, accessToken, refreshToken, profile, cb) => {
      if (req.session) {
        req.session.oauth = { accessToken, refreshToken };
      }
      cb(null, { id: profile.UUID });
    }
  )
);


app.get("/login", passport.authenticate("oauth2"), (req, res) => {
  res.redirect("/");
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get(
  "/callback",
  passport.authenticate("oauth2", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect home.
    console.log("Callback...got token from Davra Platform");
    res.redirect("/");
  }
);

app.get("/user", (req, res) => {
  // Successful authentication, redirect home.
  if (!req.user) {
    res.redirect("/");
    return;
  }
  request.get(
    `https://${TENANT_HOST}/user`,
    {
      json: true,
      headers: {
        "User-Agent": req.headers["user-agent"],
        Authorization: `Bearer ${req.session.oauth.accessToken}`,
      },
    },
    (err, response, body) => {
      if (err) {
        res.writeHead(500);
        res.write(err);
        res.end();
      } else if (response.statusCode !== 200) {
        res.writeHead(response.statusCode);
        res.write(body);
        res.end();
      } else {
        // save use response to passport session:
        req.session.passport.user = JSON.stringify(body);
        // write response to front end:
        res.writeHead(200, { "content-type": "application/json" });
        body.oauth = req.session.oauth;
        res.write(JSON.stringify(body));
        res.end();
      }
    }
  );
});

// Generate random data to send back to client
app.get("/random-data", (req, res) => {
  if (!req.user) {
    res.writeHead(401);
    res.end('Unauthorized');
    return;
  }
  console.log("Generating random data...")
  var chartData = [];
  var firstDate = new Date();
  firstDate.setDate(firstDate.getDate() - 365);
  var temp = 1200;
  var arr = []
  for (var i = 0; i < 365; i++) {
      var newDate = new Date(firstDate);
      newDate.setDate(newDate.getDate() + i);
      
      temp += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
      chartData.push({
          date: newDate,
          temperature: temp
      });
      arr.push(temp)
  }
  res.writeHead(200, { "content-type": "application/json" });
  res.write(JSON.stringify({chartData: chartData, arr: arr}));
  res.end();
})

app.use(express.json());
const staticMW = express.static("public");
app.get(
  "/",
  (req, res, next) => {
    if (!req.user) {
      res.redirect("/login");
    } else {
      next();
    }
  },
  staticMW
);

app.use(staticMW);

const server = http.createServer(app);

server.listen(SERVER_PORT, function () {
  console.log(
    "davra.com node microservice listening on port " + SERVER_PORT + "!"
  );
});

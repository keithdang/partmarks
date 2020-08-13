const { Router } = require("express");
const Session = require("../account/session");
const AccountTable = require("../account/table.js");
const TeacherTable = require("../teacher/table.js");
const StudentTable = require("../student/table.js");
const { hash } = require("../account/helper");
const { setSession, authenticatedAccount } = require("./helper");
const router = new Router();

router.post("/signup", (req, res, next) => {
  const {
    username,
    password,
    firstName,
    middleName,
    lastName,
    bTeacher,
  } = req.body;
  const usernameHash = hash(username);
  const passwordHash = hash(password);
  var role = bTeacher ? "teacher" : "student";
  AccountTable.getAccount({ usernameHash })
    .then(({ account }) => {
      if (!account) {
        return AccountTable.storeAccount({
          usernameHash,
          passwordHash,
          bTeacher,
        });
      } else {
        const error = new Error("This username has already been taken");

        error.statusCode = 409;

        throw error;
      }
    })
    .then(({ id }) => {
      if (bTeacher) {
        var teacher = { firstName, lastName, middleName };
        teacher["id"] = id.id;
        console.log("adding Teacher:", teacher);
        return TeacherTable.addTeacher(teacher);
      } else {
        var student = { firstName };
        student["id"] = id.id;
        console.log("adding Student:", student);
        return StudentTable.addStudent(student);
      }
    })
    .then(() => {
      return setSession({ username, res });
    })
    .then(({ message }) => {
      res.json({ message, role });
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  let role;
  AccountTable.getAccount({ usernameHash: hash(username) })
    .then(({ account }) => {
      if (account && account.passwordHash === hash(password)) {
        const { sessionId } = account;
        role = account.role;
        return setSession({ username, res, sessionId });
      } else {
        const error = new Error("Incorrect username/password");
        error.statusCode = 409;
        throw error;
      }
    })
    .then(({ message }) => {
      console.log("logged in");
      res.json({ message, role });
    })
    .catch((error) => next(error));
});

router.get("/logout", (req, res, next) => {
  const { username } = Session.parse(req.cookies.sessionString);
  console.log(username);
  AccountTable.updateSessionId({
    sessionId: null,
    usernameHash: hash(username),
  })
    .then(() => {
      res.clearCookie("sessionString");
      res.json({ message: "Successful logout" });
    })
    .catch((error) => next(error));
});

router.get("/authenticated", (req, res, next) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ authenticated, account }) => {
      console.log("kdawg authenticated");
      var role = account.role;
      res.json({ authenticated, role });
    })
    .catch((error) => next(error));
});

module.exports = router;

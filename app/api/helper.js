const Session = require("../account/session");
const AccountTable = require("../account/table");
const pool = require("../databasePool");
const { hash } = require("../account/helper");

const getRow = (rows, bAll) => {
  if (bAll) {
    return rows;
  } else {
    return rows[0];
  }
};

const filterRole = (account, filter = {}) => {
  if (account.role === "teacher") {
    filter["teacherId"] = account.id;
  } else {
    filter["studentId"] = account.id;
  }
  return filter;
};

const poolQuery = (input, output, bAll = true) => {
  //   console.log("poolquery query", input.query);
  //   console.log("poolquery params", input.params);
  return new Promise((resolve, reject) => {
    if (input.params && input.params[0] !== undefined) {
      pool.query(input.query, input.params, (error, response) => {
        if (error) return reject(error);

        if (response.rows.length === 0)
          return reject(new Error("No rows found"));
        resolve({ [output]: getRow(response.rows, bAll) });
      });
    } else {
      pool.query(input.query, (error, response) => {
        if (error) return reject(error);

        if (response.rows.length === 0)
          return reject(new Error("No rows found"));
        resolve({ [output]: getRow(response.rows, bAll) });
      });
    }
  });
};

const setSession = ({ username, res, sessionId }) => {
  return new Promise((resolve, reject) => {
    let session, sessionString;
    if (sessionId) {
      sessionString = Session.sessionString({ username, id: sessionId });

      setSessionCookie({ sessionString, res });

      resolve({ message: "session restored" });
    } else {
      session = new Session({ username });
      sessionString = session.toString();
      AccountTable.updateSessionId({
        sessionId: session.id,
        usernameHash: hash(username),
      })
        .then(() => {
          setSessionCookie({ sessionString, res });

          resolve({ message: "session created" });
        })
        .catch((error) => reject(error));
    }
  });
};

const setSessionCookie = ({ sessionString, res }) => {
  res.cookie("sessionString", sessionString, {
    expire: Date.now() + 3600000,
    httpOnly: true,
    // secure: true, //use with https
  });
};

const authenticatedAccount = ({ sessionString }) => {
  console.log("kdawg authenticating....");
  return new Promise((resolve, reject) => {
    if (!sessionString || !Session.verify(sessionString)) {
      const error = new Error("Invalid session");
      console.log("invalid session");
      error.statusCode = 400;
      return reject(error);
    } else {
      const { username, id } = Session.parse(sessionString);

      AccountTable.getAccount({ usernameHash: hash(username) })
        .then(({ account }) => {
          const authenticated = account.sessionId === id;
          console.log("got account ", account.id);
          resolve({ account, authenticated });
        })
        .catch((error) => reject(error));
    }
  });
};
module.exports = { setSession, authenticatedAccount, poolQuery, filterRole };

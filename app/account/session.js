const { v4: uuid } = require("uuid");
const { hash } = require("./helper");

const SEPARATOR = "|";

class Session {
  constructor({ username }) {
    this.username = username;
    this.id = uuid();
  }

  toString() {
    const { username, id } = this;
    return Session.sessionString({ username, id });
  }

  static parse(sessionString) {
    const sessionData = sessionString.split(SEPARATOR);

    return {
      username: sessionData[0],
      id: sessionData[1],
      sessionHash: sessionData[2],
    };
  }

  static verify(sessionString) {
    const { username, id, sessionHash } = Session.parse(sessionString);
    const accountData = Session.accountData({ username, id });
    return hash(accountData) === sessionHash;
  }

  static accountData({ username, id }) {
    return `${username}${SEPARATOR}${id}`;
  }

  static sessionString({ username, id }) {
    const accountData = Session.accountData({ username, id });
    var sessionString = `${accountData}${SEPARATOR}${hash(accountData)}`;
    return `${accountData}${SEPARATOR}${hash(accountData)}`;
  }
}

// const foo = new Session({ username: "foo" });

// const fooString = foo.toString();

// console.log("Session.parse(fooString)", Session.parse(fooString));
// console.log("Session.verify(fooString)", Session.verify(fooString));

// const fake = `admin+${fooString}`;

// console.log("Session.verify(fake)", Session.verify(fake));
module.exports = Session;

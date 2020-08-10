const pool = require("../databasePool");

class AccountTable {
  static storeAccount({ usernameHash, passwordHash, bTeacher }) {
    var role = bTeacher ? "teacher" : "student";
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO account("usernameHash", "passwordHash", "role") VALUES($1, $2, $3) RETURNING id`,
        [usernameHash, passwordHash, role],
        (error, response) => {
          if (error) return error;
          console.log(response.rows[0]);
          resolve({ id: response.rows[0] });
        }
      );
    });
  }

  static getAccount({ usernameHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id, "passwordHash","sessionId",role FROM account 
              WHERE "usernameHash" = $1`,
        [usernameHash],
        (error, response) => {
          if (error) return reject(error);

          resolve({ account: response.rows[0] });
        }
      );
    });
  }

  static updateSessionId({ sessionId, usernameHash }) {
    return new Promise((resolve, reject) => {
      pool.query(
        'UPDATE account SET "sessionId" = $1 WHERE "usernameHash" = $2',
        [sessionId, usernameHash],
        (error, response) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }
}

module.exports = AccountTable;

const pool = require("../databasePool");
class BasicCRUD {
  static getAll(tableName) {
    console.log(tableName);
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM students`, (error, response) => {
        if (error) return reject(error);
        if (response.rows.length === 0)
          return reject(new Error("found nothing"));
        resolve({ studentList: response.rows });
      });
    });
    // return new Promise((resolve, reject) => {
    //   pool.query(`SELECT * FROM $1`, [tableName], (error, response) => {
    //     if (error) return reject(error);
    //     if (response.rows.length === 0)
    //       return reject(new Error("found nothing"));
    //     resolve({ list: response.rows });
    //   });
    // });
  }
}
module.exports = BasicCRUD;

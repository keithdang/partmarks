const pool = require("../databasePool");

class StudentTable {
  static getStudent({ studentId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT *
                  FROM students
                  WHERE id = $1`,
        [studentId],
        (error, response) => {
          if (error) return reject(error);

          if (response.rows.length === 0)
            return reject(new Error("no students"));
          resolve({ student: response.rows[0] });
        }
      );
    });
  }

  static getStudents() {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM students`, (error, response) => {
        if (error) return reject(error);
        if (response.rows.length === 0) return reject(new Error("no students"));
        resolve({ studentList: response.rows });
      });
    });
  }
}

module.exports = StudentTable;

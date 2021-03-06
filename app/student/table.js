const pool = require("../databasePool");
const { poolQuery } = require("../api/helper");
class StudentTable {
  static getStudent({ studentId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `
        SELECT 
          *
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
    var query = `
    SELECT 
      *
    FROM 
      students`;
    return poolQuery({ query }, "studentList");
  }

  static addStudent(student) {
    var query = `INSERT INTO students (id,"firstName","middleName","lastName") VALUES ($1,$2,$3,$4) RETURNING *`;
    var params = [
      student.id,
      student.firstName,
      student.middleName,
      student.lastName,
    ];
    return poolQuery({ query, params }, "student", false);
  }

  static deleteStudent(id) {
    var query = `DELETE FROM students WHERE id = $1 RETURNING *`;
    var params = [id];
    return poolQuery({ query, params }, "student", false);
  }
}

module.exports = StudentTable;

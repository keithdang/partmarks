const pool = require("../databasePool");
const { poolQuery } = require("../api/helper");
class TeacherTable {
  static getTeacher({ teacherId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT *
                  FROM teacher
                  WHERE id = $1`,
        [teacherId],
        (error, response) => {
          if (error) return reject(error);

          if (response.rows.length === 0)
            return reject(new Error("no teachers"));
          resolve({ teacher: response.rows[0] });
        }
      );
    });
  }

  static getTeachers() {
    var query = `SELECT * FROM teacher`;
    return poolQuery({ query }, "teacherList");
  }

  static addTeacher(teacher) {
    var query = `INSERT INTO teacher ("firstName","middleName","lastName") VALUES ($1,$2,$3) RETURNING *`;
    var params = [teacher.firstName, teacher.middleName, teacher.lastName];
    return poolQuery({ query, params }, "teacher", false);
    // return new Promise((resolve, reject) => {
    //   pool.query(
    //     `INSERT INTO teacher ("firstName","middleName","lastName") VALUES ($1,$2,$3) RETURNING *`,
    //     [teacher.firstName, teacher.middleName, teacher.lastName],
    //     (error, response) => {
    //       if (error) return reject(error);
    //       resolve({ teacher: response.rows[0] });
    //     }
    //   );
    // });
  }

  static deleteTeacher(id) {
    var query = `DELETE FROM teacher WHERE id = $1 RETURNING *`;
    var params = [id];
    return poolQuery({ query, params }, "teacher", false);
    // return new Promise((resolve, reject) => {
    //   pool.query(
    //     `DELETE FROM teacher WHERE id = $1 RETURNING *`,
    //     [id],
    //     (error, response) => {
    //       if (error) return reject(error);
    //       resolve({ teacher: response.rows[0] });
    //     }
    //   );
    // });
  }
}

module.exports = TeacherTable;

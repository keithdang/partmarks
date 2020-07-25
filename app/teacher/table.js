const pool = require("../databasePool");

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
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM teacher`, (error, response) => {
        if (error) return reject(error);
        if (response.rows.length === 0) return reject(new Error("no teachers"));
        resolve({ teacherList: response.rows });
      });
    });
  }

  static addTeacher(teacher) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO teacher ("firstName","middleName","lastName") VALUES ($1,$2,$3) RETURNING *`,
        [teacher.firstName, teacher.middleName, teacher.lastName],
        (error, response) => {
          if (error) return reject(error);
          resolve({ teacher: response.rows[0] });
        }
      );
    });
  }

  static deleteTeacher(id) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM teacher WHERE id = $1 RETURNING *`,
        [id],
        (error, response) => {
          if (error) return reject(error);
          resolve({ teacher: response.rows[0] });
        }
      );
    });
  }
}

module.exports = TeacherTable;

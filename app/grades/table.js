const pool = require("../databasePool");
class GradesTable {
  static getGrades() {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM grades`, (error, response) => {
        if (error) return reject(error);
        if (response.rows.length === 0) return reject(new Error("no courses"));
        resolve({ gradeList: response.rows });
      });
    });
  }

  static addGrade(grade) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO grades ("courseId","title","total","weight") VALUES ($1,$2,$3,$4) RETURNING *`,
        [grade.courseId, grade.title, grade.total, grade.weight],
        (error, response) => {
          if (error) return reject(error);
          resolve({ template: response.rows[0] });
        }
      );
    });
  }

  static deleteGrade(grade) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM grades WHERE "courseId" = $1 AND "title" = $2 RETURNING *`,
        [grade.courseId, grade.title],
        (error, response) => {
          if (error) return reject(error);
          resolve({ course: response.rows[0] });
        }
      );
    });
  }
}

module.exports = GradesTable;

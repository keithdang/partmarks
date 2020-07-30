const pool = require("../databasePool");
const BasicCrud = require("../api/basicCRUD");
function fullCourseId(semesterCourse) {
  var num = parseInt(
    semesterCourse.courseId.toString() +
      semesterCourse.teacherId.toString() +
      semesterCourse.semester.toString()
  );
  return num;
}
class SemesterCourseTable {
  static getCourse({ courseId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT *
                  FROM semesterCourse
                  WHERE id = $1`,
        [courseId],
        (error, response) => {
          if (error) return reject(error);

          if (response.rows.length === 0)
            return reject(new Error("no courses"));
          resolve({ course: response.rows[0] });
        }
      );
    });
  }

  static getCourses() {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM semesterCourse`, (error, response) => {
        if (error) return reject(error);
        if (response.rows.length === 0) return reject(new Error("no courses"));
        // console.log(response.rows);
        resolve({ courseList: response.rows });
      });
    });
  }

  static addCourse(semesterCourse) {
    console.log(semesterCourse);
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO semesterCourse ("id","courseId","teacherId","semester","nYear") VALUES ($1,$2,$3,$4,$5) RETURNING *`,
        [
          fullCourseId(semesterCourse),
          semesterCourse.courseId,
          semesterCourse.teacherId,
          semesterCourse.semester,
          semesterCourse.nYear,
        ],
        (error, response) => {
          if (error) return reject(error);
          resolve({ semesterCourse: response.rows[0] });
        }
      );
    });
  }

  static deleteCourse(id) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM semesterCourse WHERE id = $1 RETURNING *`,
        [id],
        (error, response) => {
          if (error) return reject(error);
          resolve({ course: response.rows[0] });
        }
      );
    });
  }
}

module.exports = SemesterCourseTable;

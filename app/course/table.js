const pool = require("../databasePool");
const BasicCrud = require("../api/basicCRUD");
class CourseTable {
  static getCourse({ courseId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT *
                  FROM course
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
      pool.query(`SELECT * FROM course`, (error, response) => {
        if (error) return reject(error);
        if (response.rows.length === 0) return reject(new Error("no courses"));
        resolve({ courseList: response.rows });
      });
    });
  }

  static addCourse(course) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO course ("courseId","departmentId","displayId","title","credits") VALUES ($1,$2,$3,$4,$5) RETURNING *`,
        [
          course.courseId,
          course.departmentId,
          course.displayId,
          course.title,
          course.credits,
        ],
        (error, response) => {
          if (error) return reject(error);
          resolve({ course: response.rows[0] });
        }
      );
    });
  }

  static deleteCourse(id) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM course WHERE id = $1 RETURNING *`,
        [id],
        (error, response) => {
          if (error) return reject(error);
          resolve({ course: response.rows[0] });
        }
      );
    });
  }
}

module.exports = CourseTable;

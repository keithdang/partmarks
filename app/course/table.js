const pool = require("../databasePool");
const BasicCrud = require("../api/basicCRUD");
function fullCourseId(depeartmentId, courseId) {
  return parseInt(depeartmentId.toString() + courseId.toString());
}
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

  static getFilterList() {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT DISTINCT "departmentId"
                  FROM course`,
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length === 0) return reject(new Error("no list"));
          resolve({ filterList: response.rows });
        }
      );
    });
  }

  static getCourses(filter) {
    if (filter.departmentId) {
      return new Promise((resolve, reject) => {
        pool.query(
          `SELECT * FROM course where "departmentId" = $1`,
          [filter.departmentId],
          (error, response) => {
            if (error) return reject(error);
            if (response.rows.length === 0)
              return reject(new Error("no courses"));
            resolve({ courseList: response.rows });
          }
        );
      });
    }
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
          fullCourseId(course.departmentId, course.courseId),
          course.departmentId,
          course.courseId,
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
        `DELETE FROM course WHERE "courseId" = $1 RETURNING *`,
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

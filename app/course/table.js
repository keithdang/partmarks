const pool = require("../databasePool");
const { poolQuery } = require("../api/helper");

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
    var query = `SELECT DISTINCT "departmentId" FROM course`;
    return poolQuery({ query }, "filterList");
  }

  static getCourses(filter) {
    var query = filter.departmentId
      ? `SELECT * FROM course where "departmentId" = $1`
      : `SELECT * FROM course`;
    var params = [filter.departmentId];
    return poolQuery({ query, params }, "courseList");
  }

  static addCourse(course) {
    console.log(course);
    var query = `INSERT INTO course ("courseId","departmentId","displayId","title","credits") VALUES ($1,$2,$3,$4,$5) RETURNING *`;
    var params = [
      fullCourseId(course.departmentId, course.courseId),
      course.departmentId,
      course.courseId,
      course.title,
      course.credits,
    ];
    return poolQuery({ query, params }, "course", false);
  }

  static deleteCourse(id) {
    var query = `DELETE FROM course WHERE "courseId" = $1 RETURNING *`;
    var params = [id];
    return poolQuery({ query, params }, "course", false);
  }
}

module.exports = CourseTable;

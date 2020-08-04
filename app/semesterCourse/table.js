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
                  FROM "semesterCourse"
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

  static getCourses(filter) {
    var query = `SELECT 
      "semesterCourse".id,
      course."courseId",
      course.title,
      teacher.id as "teacherId",
      teacher."lastName" 
  from 
      "semesterCourse",
      course,
      teacher
  where 
      "semesterCourse"."courseId"=course."courseId" AND 
      "semesterCourse"."teacherId"=teacher.id`;
    if (filter.courseId) {
      query += ` AND "semesterCourse"."courseId"= $1`;
      return new Promise((resolve, reject) => {
        pool.query(query, [filter.courseId], (error, response) => {
          if (error) return reject(error);
          if (response.rows.length === 0)
            return reject(new Error("no courses"));
          resolve({ courseList: response.rows });
        });
      });
    }
    return new Promise((resolve, reject) => {
      pool.query(query, (error, response) => {
        if (error) return reject(error);
        if (response.rows.length === 0) return reject(new Error("no courses"));
        resolve({ courseList: response.rows });
      });
    });
  }

  static getFilterList() {
    return new Promise((resolve, reject) => {
      pool.query(
        ` 
      SELECT DISTINCT
        course.title,
        "semesterCourse"."courseId"
      FROM 
        course, 
        "semesterCourse" 
      WHERE 
        course."courseId"="semesterCourse"."courseId"
        `,
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length === 0) return reject(new Error("no list"));
          resolve({ filterList: response.rows });
        }
      );
    });
  }

  static addCourse(semesterCourse) {
    console.log(semesterCourse);
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO "semesterCourse" ("id","courseId","teacherId","semester","nYear") VALUES ($1,$2,$3,$4,$5) RETURNING *`,
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
        `DELETE FROM "semesterCourse" WHERE id = $1 RETURNING *`,
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

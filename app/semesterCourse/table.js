const pool = require("../databasePool");
const { poolQuery } = require("../api/helper");

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
    }
    var params = [filter.courseId];
    return poolQuery({ query, params }, "courseList");
  }

  static getFilterList() {
    var query = ` 
    SELECT DISTINCT
      course.title,
      "semesterCourse"."courseId"
    FROM 
      course, 
      "semesterCourse" 
    WHERE 
      course."courseId"="semesterCourse"."courseId"
      `;
    return poolQuery({ query }, "filterList");
  }

  static addCourse(semesterCourse) {
    var query = `INSERT INTO "semesterCourse" ("id","courseId","teacherId","semester","nYear") VALUES ($1,$2,$3,$4,$5) RETURNING *`;
    var params = [
      fullCourseId(semesterCourse),
      semesterCourse.courseId,
      semesterCourse.teacherId,
      semesterCourse.semester,
      semesterCourse.nYear,
    ];
    return poolQuery({ query, params }, "semesterCourse", false);
  }

  static deleteCourse(id) {
    var query = `DELETE FROM "semesterCourse" WHERE id = $1 RETURNING *`;
    var params = [id];
    return poolQuery({ query, params }, "course", false);
  }
}

module.exports = SemesterCourseTable;

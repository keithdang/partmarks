const pool = require("../databasePool");
const { poolQuery } = require("../api/helper");

class ClassroomTable {
  static getClassList(filter) {
    if (filter.courseId) {
      return new Promise((resolve, reject) => {
        pool.query(
          `
            SELECT 
              course.title,
              classroom."courseId",
              teacher."firstName" as prof,  
              students."firstName",
              students.id as "studentId" 
            FROM 
              classroom, 
              students,
              teacher,
              course, 
              "semesterCourse" 
            WHERE 
              classroom."studentId"=students.id AND 
              "semesterCourse"."id"=classroom."courseId" AND 
              course."courseId"="semesterCourse"."courseId" AND 
              teacher.id="semesterCourse"."teacherId" AND
              classroom."courseId" = $1;
            `,
          [filter.courseId],
          (error, response) => {
            if (error) return reject(error);
            if (response.rows.length === 0)
              return reject(new Error("no courses"));
            resolve({ classroomList: response.rows });
          }
        );
      });
    }
    return new Promise((resolve, reject) => {
      pool.query(
        `
      SELECT 
        course.title,
        classroom."courseId",
        teacher."firstName" as prof,  
        students."firstName",
        students.id as "studentId" 
      FROM 
        classroom, 
        students,
        teacher,
        course, 
        "semesterCourse" 
      WHERE 
        classroom."studentId"=students.id AND 
        "semesterCourse"."id"=classroom."courseId" AND 
        course."courseId"="semesterCourse"."courseId" AND 
        teacher.id="semesterCourse"."teacherId";
      `,
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length === 0)
            return reject(new Error("no courses"));
          resolve({ classroomList: response.rows });
        }
      );
    });
  }

  static getFilterList() {
    var query = `
    SELECT DISTINCT
      course.title,
      classroom."courseId"
    FROM
      classroom,
      course,
      "semesterCourse"
    WHERE
      "semesterCourse"."id"=classroom."courseId" AND
      course."courseId"="semesterCourse"."courseId"
      `;
    return poolQuery({ query }, "filterList");
  }

  static addCourse(signup) {
    var query = `INSERT INTO classroom ("courseId","studentId") VALUES ($1,$2) RETURNING *`;
    var params = [signup.courseId, signup.studentId];
    return poolQuery({ query, params }, "classroom", false);
  }

  static deleteCourse(classroom) {
    var query = `DELETE FROM classroom WHERE "courseId" = $1 AND "studentId" = $2 RETURNING *`;
    var params = [classroom.courseId, classroom.studentId];
    return poolQuery({ query, params }, "course", false);
  }
}

module.exports = ClassroomTable;

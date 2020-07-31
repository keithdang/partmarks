const pool = require("../databasePool");
// function fullCourseId(depeartmentId, courseId) {
//   return parseInt(depeartmentId.toString() + courseId.toString());
// }
class ClassroomTable {
  static getClassList() {
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

  static addCourse(signup) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO classroom ("courseId","studentId") VALUES ($1,$2) RETURNING *`,
        [signup.courseId, signup.studentId],
        (error, response) => {
          if (error) return reject(error);
          resolve({ classroom: response.rows[0] });
        }
      );
    });
  }

  static deleteCourse(classroom) {
    console.log(classroom);
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM classroom WHERE "courseId" = $1 AND "studentId" = $2 RETURNING *`,
        [classroom.courseId, classroom.studentId],
        (error, response) => {
          if (error) return reject(error);
          resolve({ course: response.rows[0] });
        }
      );
    });
  }
}

module.exports = ClassroomTable;

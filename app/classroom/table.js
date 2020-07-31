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
        teacher."firstName" as prof,  
        students."firstName"
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
          console.log(response.rows);
          resolve({ classroomList: response.rows });
        }
      );
    });
  }

  //   static addCourse(course) {
  //     return new Promise((resolve, reject) => {
  //       pool.query(
  //         `INSERT INTO course ("courseId","departmentId","displayId","title","credits") VALUES ($1,$2,$3,$4,$5) RETURNING *`,
  //         [
  //           fullCourseId(course.departmentId, course.courseId),
  //           course.departmentId,
  //           course.courseId,
  //           course.title,
  //           course.credits,
  //         ],
  //         (error, response) => {
  //           if (error) return reject(error);
  //           resolve({ course: response.rows[0] });
  //         }
  //       );
  //     });
  //   }

  //   static deleteCourse(id) {
  //     return new Promise((resolve, reject) => {
  //       pool.query(
  //         `DELETE FROM course WHERE "courseId" = $1 RETURNING *`,
  //         [id],
  //         (error, response) => {
  //           if (error) return reject(error);
  //           resolve({ course: response.rows[0] });
  //         }
  //       );
  //     });
  //   }
}

module.exports = ClassroomTable;

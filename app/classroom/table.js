const pool = require("../databasePool");
const { poolQuery } = require("../api/helper");

class ClassroomTable {
  static getClassList(filter) {
    var query = `
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
        teacher.id="semesterCourse"."teacherId"`;
    var params = [];
    var count = `$1`;
    if (filter.courseId) {
      params.push(filter.courseId);
      query += ` AND classroom."courseId" = $1`;
      count = `$2`;
    }
    if (filter.studentId) {
      params.push(filter.studentId);
      query += ` AND students.id = ${count}`;
    } else if (filter.teacherId) {
      params.push(filter.teacherId);
      query += ` AND teacher.id = ${count}`;
    }
    return poolQuery({ query, params }, "classroomList");
  }

  static getFilterList(filter) {
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
      course."courseId"="semesterCourse"."courseId"`;
    var params = [];

    if (filter.studentId) {
      params.push(filter.studentId);
      query += ` AND classroom."studentsId" = $1`;
    } else if (filter.teacherId) {
      params.push(filter.teacherId);
      query += ` AND "semesterCourse"."teacherId" = $1`;
    }

    return poolQuery({ query, params }, "filterList");
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

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
        students.id as "studentId", 
        classroom."grade" as grade
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

  static updateGrade(input) {
    var query = `
      UPDATE 
      classroom 
    SET
        grade = (
      SELECT ROUND((
        (SUM(score/total*weight)/SUM(weight))*100)::numeric,2)
      FROM grades
        WHERE
        "courseId" = (SELECT "courseId" from grades WHERE id=($1)) AND
        "studentId" = (SELECT "studentId" from grades WHERE id=($1)))
        WHERE
        "courseId" = (SELECT "courseId" from grades WHERE id=($1)) AND
        "studentId" =(SELECT "studentId" from grades WHERE id=($1))
        RETURNING *
        `;
    var params = [input.id];
    return poolQuery({ query, params }, "classroom", false);
  }
}

module.exports = ClassroomTable;

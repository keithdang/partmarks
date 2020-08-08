const pool = require("../databasePool");
const { poolQuery } = require("../api/helper");

class GradesTable {
  static getGrades(filter) {
    var query = `SELECT * FROM grades`;
    var params = [];
    if (filter.courseId) {
      query += ` where "courseId"= $1`;
      params.push(filter.courseId);
      if (filter.title) {
        query += ` AND "title"= $2`;
        params.push(filter.title);
      }
    }
    return poolQuery({ query, params }, "gradeList");
  }

  static getFilterList() {
    var query = `
    SELECT DISTINCT
            course.title,
            grades."courseId"
    FROM 
    grades, 
        course, 
        "semesterCourse" 
    WHERE 
        "semesterCourse"."id"=grades."courseId" AND 
        course."courseId"="semesterCourse"."courseId"`;
    return poolQuery({ query }, "filterList");
  }

  static getSubFilterList(filter) {
    var query = `
    SELECT DISTINCT
        grades.title
    FROM 
        grades, 
        course, 
        "semesterCourse" 
    WHERE 
        "semesterCourse"."id"=grades."courseId" AND 
        course."courseId"="semesterCourse"."courseId" AND
        grades."courseId" = $1`;
    var params = [filter.courseId];
    return poolQuery({ query, params }, "filterList");
  }

  static addGrade(grade) {
    var query = `INSERT INTO grades ("courseId","title","total","weight") VALUES ($1,$2,$3,$4) RETURNING *`;
    var params = [grade.courseId, grade.title, grade.total, grade.weight];
    return poolQuery({ query, params }, "template", false);
  }

  static addGradeFromTemplate(template) {
    var query = `
    INSERT INTO 
        grades
        ("courseId","studentId",title,total,"weight")
    SELECT 
        "marksTemplate"."courseId", 
        classroom."studentId", 
        "marksTemplate".title, 
        "marksTemplate".total, 
        "marksTemplate"."weight"
    FROM 
        "marksTemplate", classroom
    WHERE 
        "marksTemplate"."courseId"= $1 AND 
        "marksTemplate"."title"= $2 AND 
        "marksTemplate"."courseId"=classroom."courseId"  
        RETURNING *
    `;
    var params = [template.courseId, template.title];
    return poolQuery({ query, params }, "grade");
  }

  static addGradeFromStudentSignUp(classroom) {
    var query = `
    INSERT INTO 
        grades
            ("courseId","studentId",title,total,"weight")
        SELECT 
            "marksTemplate"."courseId", 
            classroom."studentId", 
            "marksTemplate".title, 
            "marksTemplate".total, 
            "marksTemplate"."weight"
        FROM 
            "marksTemplate", classroom
        WHERE 
            classroom."courseId"= ($1) AND 
            classroom."studentId"= ($2) AND 
            "marksTemplate"."courseId"=classroom."courseId"  
            RETURNING *
    `;
    var params = [classroom.courseId, classroom.studentId];
    return poolQuery({ query, params }, "grade");
  }

  static deleteGrade(grade) {
    var query = `DELETE FROM grades WHERE "courseId" = $1 AND "studentId" = $2 RETURNING *`;
    var params = [grade.courseId, grade.studentId];
    return poolQuery({ query, params }, "grade");
  }

  static deleteGradeFromTemplate(template) {
    var query = `DELETE FROM grades WHERE "courseId" = $1 AND "title" = $2 RETURNING *`;
    var params = [template.courseId, template.title];
    return poolQuery({ query, params }, "grade");
  }
}

module.exports = GradesTable;

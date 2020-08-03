const pool = require("../databasePool");
class GradesTable {
  static getGrades(filter) {
    if (filter.courseId) {
      var gradeQuery = `SELECT * FROM grades where "courseId"= $1`;
      var criteria = [filter.courseId];
      if (filter.title) {
        gradeQuery = `SELECT * FROM grades where "courseId"= $1 AND "title" = $2`;
        criteria.push(filter.title);
      }
      return new Promise((resolve, reject) => {
        pool.query(gradeQuery, criteria, (error, response) => {
          if (error) return reject(error);
          if (response.rows.length === 0)
            return reject(new Error("no courses"));
          resolve({ gradeList: response.rows });
        });
      });
    }

    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM grades`, (error, response) => {
        if (error) return reject(error);
        if (response.rows.length === 0) return reject(new Error("no courses"));
        resolve({ gradeList: response.rows });
      });
    });
  }

  static getFilterList() {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT DISTINCT
        course.title,
        grades."courseId"
      FROM 
      grades, 
        course, 
        "semesterCourse" 
      WHERE 
        "semesterCourse"."id"=grades."courseId" AND 
        course."courseId"="semesterCourse"."courseId"`,
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length === 0) return reject(new Error("no list"));
          resolve({ filterList: response.rows });
        }
      );
    });
  }

  static getSubFilterList(filter) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT DISTINCT
        grades.title
      FROM 
      grades, 
        course, 
        "semesterCourse" 
      WHERE 
        "semesterCourse"."id"=grades."courseId" AND 
        course."courseId"="semesterCourse"."courseId" AND
        grades."courseId" = $1`,
        [filter.courseId],
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length === 0) return reject(new Error("no list"));
          resolve({ filterList: response.rows });
        }
      );
    });
  }

  static addGrade(grade) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO grades ("courseId","title","total","weight") VALUES ($1,$2,$3,$4) RETURNING *`,
        [grade.courseId, grade.title, grade.total, grade.weight],
        (error, response) => {
          if (error) return reject(error);
          resolve({ template: response.rows[0] });
        }
      );
    });
  }

  static addGradeFromTemplate(template) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO 
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
    `,
        [template.courseId, template.title],
        (error, response) => {
          if (error) return reject(error);
          resolve({ grade: response.rows });
        }
      );
    });
  }

  static addGradeFromStudentSignUp(classroom) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO 
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
    `,
        [classroom.courseId, classroom.studentId],
        (error, response) => {
          if (error) return reject(error);
          resolve({ grade: response.rows });
        }
      );
    });
  }

  static deleteGrade(grade) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM grades WHERE "courseId" = $1 AND "studentId" = $2 RETURNING *`,
        [grade.courseId, grade.studentId],
        (error, response) => {
          if (error) return reject(error);
          resolve({ grade: response.rows });
        }
      );
    });
  }

  static deleteGradeFromTemplate(template) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM grades WHERE "courseId" = $1 AND "title" = $2 RETURNING *`,
        [template.courseId, template.title],
        (error, response) => {
          if (error) return reject(error);
          resolve({ grade: response.rows });
        }
      );
    });
  }
}

module.exports = GradesTable;

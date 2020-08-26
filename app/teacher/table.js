const pool = require("../databasePool");
const { poolQuery } = require("../api/helper");

class TeacherTable {
  static getTeacher({ teacherId }) {
    var query = `
    SELECT 
      *
    FROM 
      teacher where id = $1`;
    var params = [teacherId];
    return poolQuery({ query, params }, "teacher", false);
  }

  static getOne({ teacherId }) {
    var query = `
    SELECT 
      *
    FROM 
      teacher where id = $1`;
    var params = [teacherId];
    return poolQuery({ query, params }, "teacher", false);
  }

  static getTeachers() {
    var query = `
    SELECT 
        *
    FROM 
        teacher`;
    return poolQuery({ query }, "teacherList");
  }

  static addTeacher(teacher) {
    var query = `INSERT INTO teacher (id,"firstName","middleName","lastName") VALUES ($1,$2,$3,$4) RETURNING *`;
    var params = [
      teacher.id,
      teacher.firstName,
      teacher.middleName,
      teacher.lastName,
    ];
    return poolQuery({ query, params }, "teacher", false);
  }

  static deleteTeacher(id) {
    var query = `DELETE FROM teacher WHERE id = $1 RETURNING *`;
    var params = [id];
    return poolQuery({ query, params }, "teacher", false);
  }
}

module.exports = TeacherTable;

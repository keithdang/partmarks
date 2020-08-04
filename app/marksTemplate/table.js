const pool = require("../databasePool");
const { response } = require("express");
class MarksTemplateTable {
  static getTemplates(filter) {
    var query = `SELECT * FROM "marksTemplate"`;
    if (filter.courseId) {
      query += ` WHERE "courseId" = $1`;
      return new Promise((resolve, reject) => {
        pool.query(query, [filter.courseId], (error, response) => {
          if (error) return reject(error);
          if (response.rows.length === 0)
            return reject(new Error("no courses"));
          resolve({ templateList: response.rows });
        });
      });
    }
    return new Promise((resolve, reject) => {
      pool.query(
        //   `SELECT * FROM "marksTemplate"`
        query,
        (error, response) => {
          if (error) return reject(error);
          if (response.rows.length === 0)
            return reject(new Error("no courses"));
          resolve({ templateList: response.rows });
        }
      );
    });
  }

  static getFilterList() {
    return new Promise((resolve, reject) => {
      pool.query(
        ` 
      SELECT DISTINCT
        course.title,
        "marksTemplate"."courseId"
      FROM 
      "marksTemplate", 
        course, 
        "semesterCourse" 
      WHERE 
        "semesterCourse"."id"="marksTemplate"."courseId" AND 
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

  static addTemplate(template) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO "marksTemplate" ("courseId","title","total","weight") VALUES ($1,$2,$3,$4) RETURNING *`,
        [template.courseId, template.title, template.total, template.weight],
        (error, response) => {
          if (error) return reject(error);
          resolve({ template: response.rows[0] });
        }
      );
    });
  }

  static deleteTemplate(template) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM "marksTemplate" WHERE "courseId" = $1 AND "title" = $2 RETURNING *`,
        [template.courseId, template.title],
        (error, response) => {
          if (error) return reject(error);
          resolve({ template: response.rows[0] });
        }
      );
    });
  }
}

module.exports = MarksTemplateTable;

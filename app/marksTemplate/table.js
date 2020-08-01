const pool = require("../databasePool");
class MarksTemplateTable {
  static getTemplates() {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM "marksTemplate"`, (error, response) => {
        if (error) return reject(error);
        if (response.rows.length === 0) return reject(new Error("no courses"));
        resolve({ templateList: response.rows });
      });
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

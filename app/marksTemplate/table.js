const pool = require("../databasePool");
const { poolQuery } = require("../api/helper");

const { response } = require("express");
class MarksTemplateTable {
  static getTemplates(filter) {
    var query = `SELECT * FROM "marksTemplate"`;
    var params = [];
    if (filter.courseId) {
      query += ` where "courseId"= $1`;
      params.push(filter.courseId);
    }
    return poolQuery({ query, params }, "templateList");
  }

  static getFilterList() {
    var query = ` 
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
      `;
    return poolQuery({ query }, "filterList");
  }

  static addTemplate(template) {
    var query = `INSERT INTO "marksTemplate" ("courseId","title","total","weight") VALUES ($1,$2,$3,$4) RETURNING *`;
    var params = [
      template.courseId,
      template.title,
      template.total,
      template.weight,
    ];
    return poolQuery({ query, params }, "template", false);
  }

  static deleteTemplate(template) {
    var query = `DELETE FROM "marksTemplate" WHERE "courseId" = $1 AND "title" = $2 RETURNING *`;
    var params = [template.courseId, template.title];
    return poolQuery({ query, params }, "template", false);
  }
}

module.exports = MarksTemplateTable;

const pool = require("../databasePool");
const { poolQuery } = require("../api/helper");

const { response } = require("express");
class MarksTemplateTable {
  static getTemplates(filter) {
    var query = `
    SELECT 
        * 
    FROM 
        "marksTemplate"`;
    var queryTeacher = `
    SELECT 
        * 
    FROM 
        "marksTemplate",
        "semesterCourse" 
    WHERE 
        "marksTemplate"."courseId"="semesterCourse".id
        AND "semesterCourse"."teacherId"= $1`;

    var params = [];
    if (filter.teacherId) {
      query = queryTeacher;
      params.push(filter.teacherId);
      if (filter.courseId) {
        query += ` AND "marksTemplate"."courseId"= $2`;
        params.push(filter.courseId);
      }
    } else if (filter.courseId) {
      query += ` where "marksTemplate"."courseId"= $1`;
      params.push(filter.courseId);
    }
    return poolQuery({ query, params }, "templateList");
  }

  static getFilterList(filter) {
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
    var params = [];
    if (filter.teacherId) {
      query += ` AND "semesterCourse"."teacherId"= $1`;
      params.push(filter.teacherId);
    }
    return poolQuery({ query, params }, "filterList");
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

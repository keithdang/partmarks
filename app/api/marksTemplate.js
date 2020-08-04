const { Router } = require("express");
const MarksTemplateTable = require("../marksTemplate/table");
const GradesTable = require("../grades/table");
const router = new Router();

router.get("/list", async (req, res) => {
  MarksTemplateTable.getTemplates(req.query)
    .then(({ templateList }) => {
      res.json({ templateList });
    })
    .catch((error) => console.error(error));
});

router.get("/filter", async (req, res) => {
  MarksTemplateTable.getFilterList()
    .then(({ filterList }) => res.json({ filterList }))
    .catch((error) => console.error(error));
});

router.post("/add", async (req, res) => {
  let jsonres;
  MarksTemplateTable.addTemplate(req.query)
    .then(({ template }) => {
      if (template) {
        jsonres = template;
        return GradesTable.addGradeFromTemplate(template);
      } else {
        const error = new Error("could not process classroom");

        error.statusCode = 409;

        throw error;
      }
    })
    .then(() => {
      res.json({ template: jsonres });
    })
    .catch((error) => console.error(error));
});

router.post("/delete", async (req, res) => {
  let jsonres;
  MarksTemplateTable.deleteTemplate(req.query)
    .then(({ template }) => {
      if (template) {
        jsonres = template;
        return GradesTable.deleteGradeFromTemplate(template);
      } else {
        const error = new Error("could not process classroom");

        error.statusCode = 409;

        throw error;
      }
    })
    .then(() => {
      res.json({ template: jsonres });
    })
    .catch((error) => console.error(error));
});
module.exports = router;

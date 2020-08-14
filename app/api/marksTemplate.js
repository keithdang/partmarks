const { Router } = require("express");
const MarksTemplateTable = require("../marksTemplate/table");
const GradesTable = require("../grades/table");
const { authenticatedAccount } = require("./helper");
const router = new Router();

router.get("/list", async (req, res) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString }).then(
    ({ account }) => {
      var teacherId = account.id;
      var courseId = req.query.courseId;
      MarksTemplateTable.getTemplates({ teacherId, courseId })
        .then(({ templateList }) => {
          res.json({ templateList });
        })
        .catch((error) => console.error(error));
    }
  );
});

router.get("/filter", async (req, res) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString }).then(
    ({ account }) => {
      var teacherId = account.id;
      MarksTemplateTable.getFilterList({ teacherId })
        .then(({ filterList }) => res.json({ filterList }))
        .catch((error) => console.error(error));
    }
  );
});

router.post("/add", async (req, res) => {
  let jsonres;
  MarksTemplateTable.addTemplate(req.body)
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
  MarksTemplateTable.deleteTemplate(req.body)
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

const { Router } = require("express");
const MarksTemplateTable = require("../marksTemplate/table");
const router = new Router();

router.get("/list", async (req, res) => {
  MarksTemplateTable.getTemplates()
    .then(({ templateList }) => {
      res.json({ templateList });
    })
    .catch((error) => console.error(error));
});

router.post("/add", async (req, res) => {
  MarksTemplateTable.addTemplate(req.query)
    .then(({ template }) => res.json({ template }))
    .catch((error) => console.error(error));
});

router.post("/delete", async (req, res) => {
  MarksTemplateTable.deleteTemplate(req.query)
    .then(({ template }) => res.json({ template }))
    .catch((error) => console.error(error));
});
module.exports = router;

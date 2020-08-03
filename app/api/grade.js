const { Router } = require("express");
const GradesTable = require("../grades/table");
const router = new Router();

router.get("/list", async (req, res) => {
  GradesTable.getGrades(req.query)
    .then(({ gradeList }) => {
      res.json({ gradeList });
    })
    .catch((error) => console.error(error));
});

router.post("/add", async (req, res) => {
  GradesTable.addGrade(req.query)
    .then(({ grade }) => res.json({ grade }))
    .catch((error) => console.error(error));
});

router.get("/filter", async (req, res) => {
  GradesTable.getFilterList()
    .then(({ filterList }) => res.json({ filterList }))
    .catch((error) => console.error(error));
});

router.get("/subfilter", async (req, res) => {
  GradesTable.getSubFilterList(req.query)
    .then(({ filterList }) => res.json({ filterList }))
    .catch((error) => console.error(error));
});

router.post("/delete", async (req, res) => {
  GradesTable.deleteGrade(req.query)
    .then(({ grade }) => res.json({ grade }))
    .catch((error) => console.error(error));
});

router.post("/deleteFromTemplate", async (req, res) => {
  GradesTable.deleteGradeFromTemplate(req.query)
    .then(({ grade }) => res.json({ grade }))
    .catch((error) => console.error(error));
});
module.exports = router;

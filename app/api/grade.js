const { Router } = require("express");
const GradesTable = require("../grades/table");
const ClassroomTable = require("../classroom/table");
const { authenticatedAccount } = require("./helper");

const router = new Router();

router.get("/list", async (req, res) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account }) => {
      var filter = req.query;
      if (account.role === "teacher") {
        filter["teacherId"] = account.id;
      } else {
        filter["studentId"] = account.id;
      }
      return GradesTable.getGrades(filter);
    })
    .then(({ gradeList }) => {
      res.json({ gradeList });
    })
    .catch((error) => console.error(error));
});

router.post("/add", async (req, res) => {
  GradesTable.addGrade(req.body)
    .then(({ grade }) => res.json({ grade }))
    .catch((error) => console.error(error));
});

router.post("/update", async (req, res) => {
  let gradeJson;
  GradesTable.updateScore(req.body)
    .then(({ grade }) => {
      gradeJson = grade;
      return ClassroomTable.updateGrade(req.body);
    })
    .then(() => res.json({ gradeJson }))
    .catch((error) => console.error(error));
});

router.get("/filter", async (req, res) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account }) => {
      var filter = {};
      if (account.role === "teacher") {
        filter["teacherId"] = account.id;
      } else {
        filter["studentId"] = account.id;
      }
      return GradesTable.getFilterList(filter);
    })
    .then(({ filterList }) => {
      console.log("filterList:", filterList);
      res.json({ filterList });
    })
    .catch((error) => console.error(error));
});

router.get("/subfilter", async (req, res) => {
  GradesTable.getSubFilterList(req.query)
    .then(({ filterList }) => res.json({ filterList }))
    .catch((error) => console.error(error));
});

router.get("/average", async (req, res) => {
  GradesTable.getGradeAverage(req.query)
    .then(({ average }) => {
      res.json({ average });
    })
    .catch((error) => console.error(error));
});

router.post("/delete", async (req, res) => {
  GradesTable.deleteGrade(req.body)
    .then(({ grade }) => res.json({ grade }))
    .catch((error) => console.error(error));
});

router.post("/deleteFromTemplate", async (req, res) => {
  GradesTable.deleteGradeFromTemplate(req.body)
    .then(({ grade }) => res.json({ grade }))
    .catch((error) => console.error(error));
});
module.exports = router;

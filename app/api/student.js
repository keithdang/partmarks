const { Router } = require("express");
const StudentTable = require("../student/table");
const router = new Router();

router.get("/one", async (req, res) => {
  console.log("students/one");
  console.log("req.query", req.query);
  StudentTable.getStudent({ studentId: req.query.id })
    .then(({ student }) => res.json({ student }))
    .catch((error) => console.error(error));
});

module.exports = router;

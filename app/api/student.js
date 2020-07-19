const { Router } = require("express");
const StudentTable = require("../student/table");
const router = new Router();

router.get("/one", (req, res) => {
  console.log("students/one");
  StudentTable.getStudent({ studentId: "1" })
    .then(({ student }) => res.json({ student }))
    .catch((error) => console.error(error));
});

module.exports = router;

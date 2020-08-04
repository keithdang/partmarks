const { Router } = require("express");
const StudentTable = require("../student/table");
const router = new Router();

router.get("/one", async (req, res) => {
  StudentTable.getStudent({ studentId: req.query.id })
    .then(({ student }) => res.json({ student }))
    .catch((error) => console.error(error));
});

router.get("/list", async (req, res) => {
  StudentTable.getStudents()
    .then(({ studentList }) => res.json({ studentList }))
    .catch((error) => console.error(error));
});

router.post("/add", async (req, res) => {
  StudentTable.addStudent(req.body.firstName)
    .then(({ student }) => res.json({ student }))
    .catch((error) => console.error(error));
});

router.post("/delete", (req, res) => {
  StudentTable.deleteStudent(req.body.id)
    .then(({ student }) => res.json({ student }))
    .catch((error) => console.error(error));
});

module.exports = router;

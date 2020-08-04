const { Router } = require("express");
const TeacherTable = require("../teacher/table");
const router = new Router();

router.get("/one", async (req, res) => {
  TeacherTable.getTeacher({ teacherId: req.query.id })
    .then(({ teacher }) => res.json({ teacher }))
    .catch((error) => console.error(error));
});

router.get("/list", async (req, res) => {
  TeacherTable.getTeachers()
    .then(({ teacherList }) => {
      res.json({ teacherList });
    })
    .catch((error) => console.error(error));
});

router.post("/add", async (req, res) => {
  TeacherTable.addTeacher(req.body)
    .then(({ teacher }) => res.json({ teacher }))
    .catch((error) => console.error(error));
});

router.post("/delete", async (req, res) => {
  TeacherTable.deleteTeacher(req.body.id)
    .then(({ teacher }) => res.json({ teacher }))
    .catch((error) => console.error(error));
});
module.exports = router;

const { Router } = require("express");
const SemesterCourseTable = require("../semesterCourse/table");
const router = new Router();

router.get("/list", async (req, res) => {
  SemesterCourseTable.getCourses(req.query)
    .then(({ courseList }) => {
      res.json({ courseList });
    })
    .catch((error) => console.error(error));
});

router.get("/filter", async (req, res) => {
  SemesterCourseTable.getFilterList()
    .then(({ filterList }) => res.json({ filterList }))
    .catch((error) => console.error(error));
});

router.post("/add", async (req, res) => {
  SemesterCourseTable.addCourse(req.body)
    .then(({ semesterCourse }) => res.json({ semesterCourse }))
    .catch((error) => console.error(error));
});

router.post("/delete", async (req, res) => {
  SemesterCourseTable.deleteCourse(req.body.id)
    .then(({ course }) => res.json({ course }))
    .catch((error) => console.error(error));
});
module.exports = router;

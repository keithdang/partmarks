const { Router } = require("express");
const CourseTable = require("../course/table");
const router = new Router();

router.get("/list", async (req, res) => {
  CourseTable.getCourses()
    .then(({ courseList }) => {
      res.json({ courseList });
    })
    .catch((error) => console.error(error));
});

router.post("/add", async (req, res) => {
  CourseTable.addCourse(req.query)
    .then(({ course }) => res.json({ course }))
    .catch((error) => console.error(error));
});

router.post("/delete", async (req, res) => {
  CourseTable.deleteCourse(req.query.id)
    .then(({ course }) => res.json({ course }))
    .catch((error) => console.error(error));
});
module.exports = router;
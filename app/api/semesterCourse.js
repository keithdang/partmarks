const { Router } = require("express");
const SemesterCourseTable = require("../semesterCourse/table");
const router = new Router();

router.get("/list", async (req, res) => {
  //   console.log("list");
  SemesterCourseTable.getCourses()
    .then(({ courseList }) => {
      //   console.log(courseList);
      res.json({ courseList });
    })
    .catch((error) => console.error(error));
});

router.post("/add", async (req, res) => {
  SemesterCourseTable.addCourse(req.query)
    .then(({ course }) => res.json({ course }))
    .catch((error) => console.error(error));
});

router.post("/delete", async (req, res) => {
  SemesterCourseTable.deleteCourse(req.query.id)
    .then(({ course }) => res.json({ course }))
    .catch((error) => console.error(error));
});
module.exports = router;

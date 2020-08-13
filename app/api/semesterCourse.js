const { Router } = require("express");
const SemesterCourseTable = require("../semesterCourse/table");
const { authenticatedAccount } = require("./helper");
const router = new Router();

router.get("/list", async (req, res) => {
  SemesterCourseTable.getCourses(req.query)
    .then(({ courseList }) => {
      res.json({ courseList });
    })
    .catch((error) => console.error(error));
});

router.get("/yourlist", async (req, res) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString }).then(
    ({ account }) => {
      console.log("id", account.id);
      console.log(req.query);
      var teacherId = account.id;
      var courseId = req.query.courseId;
      SemesterCourseTable.getCourses({ teacherId, courseId })
        .then(({ courseList }) => {
          console.log("courselist", courseList);
          res.json({ courseList });
        })
        .catch((error) => console.error(error));
    }
  );
});

router.get("/filter", async (req, res) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account }) => {
      var filter = {};
      if (account.role === "teacher") {
        filter["teacherId"] = account.id;
      }
      return SemesterCourseTable.getFilterList(filter);
    })
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

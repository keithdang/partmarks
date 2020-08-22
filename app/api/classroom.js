const { Router } = require("express");
const ClassroomTable = require("../classroom/table");
const GradesTable = require("../grades/table");
const { authenticatedAccount } = require("./helper");

const router = new Router();

router.get("/list", async (req, res) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account }) => {
      var filter = { courseId: req.query.courseId };
      if (account.role === "teacher") {
        filter["teacherId"] = account.id;
      } else {
        filter["studentId"] = account.id;
      }
      return ClassroomTable.getClassList(filter);
    })
    .then(({ classroomList }) => {
      res.json({ classroomList });
    })
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
      return ClassroomTable.getFilterList(filter);
    })
    .then(({ filterList }) => res.json({ filterList }))
    .catch((error) => console.error(error));
});

router.get("/average", async (req, res) => {
  ClassroomTable.getClassAverage(req.query)
    .then(({ average }) => {
      res.json({ average });
    })
    .catch((error) => console.error(error));
});

router.get("/grades", async (req, res) => {
  console.log("grades");
  ClassroomTable.getGrades(req.query)
    .then(({ grades }) => {
      res.json({ grades });
    })
    .catch((error) => console.error(error));
});

router.post("/add", async (req, res) => {
  let jsonres;
  ClassroomTable.addCourse(req.query)
    .then(({ classroom }) => {
      if (classroom) {
        jsonres = classroom;
        GradesTable.addGradeFromStudentSignUp(classroom).catch((error) => {
          if (error.message === "No rows found") {
            console.error("No Marks Template");
          } else {
            const error = new Error("could not process grades");

            error.statusCode = 409;

            throw error;
          }
        });
      } else {
        const error = new Error("could not process classroom");

        error.statusCode = 409;

        throw error;
      }
    })
    .then(() => {
      res.json({ classroom: jsonres });
    })
    .catch((error) => {
      console.error("classroom add error", error);
    });
});

router.post("/delete", async (req, res) => {
  ClassroomTable.deleteCourse(req.query)
    .then(({ course }) => res.json({ course }))
    .catch((error) => console.error(error));
});
module.exports = router;

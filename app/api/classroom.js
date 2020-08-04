const { Router } = require("express");
const ClassroomTable = require("../classroom/table");
const GradesTable = require("../grades/table");

const router = new Router();

router.get("/list", async (req, res) => {
  console.log(req.query);
  console.log(req.body);
  ClassroomTable.getClassList(req.query)
    .then(({ classroomList }) => {
      res.json({ classroomList });
    })
    .catch((error) => console.error(error));
});

router.get("/filter", async (req, res) => {
  ClassroomTable.getFilterList()
    .then(({ filterList }) => res.json({ filterList }))
    .catch((error) => console.error(error));
});

router.post("/add", async (req, res) => {
  let jsonres;
  ClassroomTable.addCourse(req.query)
    .then(({ classroom }) => {
      if (classroom) {
        jsonres = classroom;
        return GradesTable.addGradeFromStudentSignUp(classroom);
      } else {
        const error = new Error("could not process classroom");

        error.statusCode = 409;

        throw error;
      }
    })
    .then(() => {
      res.json({ classroom: jsonres });
    })
    .catch((error) => console.error(error));
});

router.post("/delete", async (req, res) => {
  ClassroomTable.deleteCourse(req.query)
    .then(({ course }) => res.json({ course }))
    .catch((error) => console.error(error));
});
module.exports = router;

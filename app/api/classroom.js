const { Router } = require("express");
const ClassroomTable = require("../classroom/table");
const router = new Router();

router.get("/list", async (req, res) => {
  ClassroomTable.getClassList()
    .then(({ classroomList }) => {
      res.json({ classroomList });
    })
    .catch((error) => console.error(error));
});

router.post("/add", async (req, res) => {
  ClassroomTable.addCourse(req.query)
    .then(({ classroom }) => res.json({ classroom }))
    .catch((error) => console.error(error));
});

router.post("/delete", async (req, res) => {
  ClassroomTable.deleteCourse(req.query)
    .then(({ course }) => res.json({ course }))
    .catch((error) => console.error(error));
});
module.exports = router;

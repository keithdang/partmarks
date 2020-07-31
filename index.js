const express = require("express");
const path = require("path");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const studentRouter = require("./app/api/student");
const teacherRouter = require("./app/api/teacher");
const courseRouter = require("./app/api/course");
const semesterCourseRouter = require("./app/api/semesterCourse");
const classroomRouter = require("./app/api/classroom");
const app = express();

app.use(express.static(path.join(__dirname, "client/build")));

app.use("/students", studentRouter);
app.use("/teacher", teacherRouter);
app.use("/course", courseRouter);
app.use("/semesterCourse", semesterCourseRouter);
app.use("/classroom", classroomRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);

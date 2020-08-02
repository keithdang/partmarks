const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const studentRouter = require("./app/api/student");
const teacherRouter = require("./app/api/teacher");
const courseRouter = require("./app/api/course");
const semesterCourseRouter = require("./app/api/semesterCourse");
const classroomRouter = require("./app/api/classroom");
const marksTemplateRouter = require("./app/api/marksTemplate");
const gradeRouter = require("./app/api/grade");
const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(express.static(path.join(__dirname, "client/build")));

app.use("/students", studentRouter);
app.use("/teacher", teacherRouter);
app.use("/course", courseRouter);
app.use("/semesterCourse", semesterCourseRouter);
app.use("/classroom", classroomRouter);
app.use("/marksTemplate", marksTemplateRouter);
app.use("/grade", gradeRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);

CREATE TABLE classroom
(
    "courseId" INTEGER,
    "studentId" INTEGER,
    "grade" INTEGER,
    FOREIGN KEY ("courseId") REFERENCES "semesterCourse"("id"),
    FOREIGN KEY ("studentId") REFERENCES "students"("id")
);

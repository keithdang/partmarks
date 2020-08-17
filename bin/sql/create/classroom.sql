CREATE TABLE classroom
(
    "courseId" INTEGER,
    "studentId" INTEGER,
    "grade" FLOAT,
    FOREIGN KEY ("courseId") REFERENCES "semesterCourse"("id"),
    FOREIGN KEY ("studentId") REFERENCES "students"("id")
);

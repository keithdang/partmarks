CREATE TABLE grades
(
    "courseId" INTEGER,
    "studentId" INTEGER,
    "title" VARCHAR(64),
    "score" FLOAT,
    "total" FLOAT,
    "weight" FLOAT,
    FOREIGN KEY ("courseId") REFERENCES "semesterCourse"("id"),
    FOREIGN KEY ("studentId") REFERENCES "students"("id")
);

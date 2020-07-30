CREATE TABLE semesterCourse
(
    "id" INTEGER PRIMARY KEY,
    "courseId" INTEGER,
    "teacherId" INTEGER,
    "semester" INTEGER,
    "nYear" INTEGER,
    FOREIGN KEY ("courseId") REFERENCES "course"("courseId"),
    FOREIGN KEY ("teacherId") REFERENCES "teacher"("id")
);

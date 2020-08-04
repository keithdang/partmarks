CREATE TABLE "marksTemplate"
(
    "courseId" INTEGER,
    "title" VARCHAR(64),
    "total" FLOAT,
    "weight" FLOAT,
    FOREIGN KEY ("courseId") REFERENCES "semesterCourse"("id")
);

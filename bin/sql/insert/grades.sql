INSERT INTO grades
    ("courseId","studentId",title,total,"weight")
SELECT "marksTemplate"."courseId", classroom."studentId", "marksTemplate".title, "marksTemplate".total, "marksTemplate"."weight"
FROM "marksTemplate", classroom
WHERE "marksTemplate"."courseId"=classroom."courseId"

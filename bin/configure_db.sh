#!/bin/bash
echo "Hi MOM"
hostLine="$(grep host ./config/dev.js)"
userLine="$(grep user ./config/dev.js)"
databaseLine="$(grep database ./config/dev.js)"
passwordLine="$(grep password ./config/dev.js)"

read -ra hostArr <<< "$hostLine"
read -ra userArr <<< "$userLine"
read -ra databaseArr <<< "$databaseLine"
read -ra passwordArr <<< "$passwordLine"

host="${hostArr[1]:1:(${#hostArr[1]}-3)}"
user="${userArr[1]:1:(${#userArr[1]}-3)}"
database="${databaseArr[1]:1:(${#databaseArr[1]}-3)}"
password="${passwordArr[1]:1:(${#passwordArr[1]}-3)}"

export PGPASSWORD="$password"

# psql -h $host -d $database -U $user < ./bin/sql/teacher.sql
# psql -h $host -d $database -U $user < ./bin/sql/create/grades.sql

psql -h $host -d $database -U $user < ./bin/sql/create/account.sql
psql -h $host -d $database -U $user < ./bin/sql/create/student.sql
psql -h $host -d $database -U $user < ./bin/sql/create/teacher.sql
psql -h $host -d $database -U $user < ./bin/sql/create/course.sql
psql -h $host -d $database -U $user < ./bin/sql/create/semesterCourse.sql
psql -h $host -d $database -U $user < ./bin/sql/create/classroom.sql
psql -h $host -d $database -U $user < ./bin/sql/create/marksTemplate.sql
psql -h $host -d $database -U $user < ./bin/sql/create/grades.sql

# psql -h $host -d $database -U $user < ./bin/sql/delete/dropAll.sql
echo "Bye MOM"
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
# psql -h $host -d $database -U $user < ./bin/sql/semesterCourse.sql
# psql -h $host -d $database -U $user < ./bin/sql/classroom.sql
# psql -h $host -d $database -U $user < ./bin/sql/marksTemplate.sql
# psql -h $host -d $database -U $user < ./bin/sql/grades.sql
# psql -h $host -d $database -U $user < ./bin/sql/insert/marksTemplate.sql
psql -h $host -d $database -U $user < ./bin/sql/insert/grades.sql

echo "Bye MOM"
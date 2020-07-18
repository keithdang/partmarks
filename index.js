const express = require("express");
const path = require("path");
const StudentTable = require("./app/student/table");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/api/students", (req, res) => {
  console.log("students");
  StudentTable.getStudent({ studentId: "1" })
    .then(({ student }) => res.json({ student }))
    .catch((error) => console.error(error));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);

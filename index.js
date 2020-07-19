const express = require("express");
const path = require("path");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const studentRouter = require("./app/api/student");
const app = express();

app.use(express.static(path.join(__dirname, "client/build")));

app.use("/students", studentRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`listening on ${port}`);

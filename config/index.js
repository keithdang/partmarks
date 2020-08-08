if (process.env.NODE_ENV === "production") {
  module.exports = require("./shaProd");
} else {
  module.exports = require("./shaDev");
}

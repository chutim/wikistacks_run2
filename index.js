const express = require("express");
const app = express();
const morgan = require("morgan");
const { db } = require("./models");
const routes = require("./routes");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
app.use(morgan("dev"));

app.use("/", routes);

db.authenticate().then(() => console.log("Database connected!"));

const PORT = 3000;
const init = async () => {
  await db.sync({ force: true });
  app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}!`);
  });
};
init();

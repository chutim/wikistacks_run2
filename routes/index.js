const router = require("express").Router();
const wikiRouter = require("./wiki");
const userRouter = require("./user");

router.use("/wiki", wikiRouter);
router.use("/users", userRouter);
router.get("/", (req, res, next) => {
  res.redirect("/wiki");
});

module.exports = router;

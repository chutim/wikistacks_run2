const router = require("express").Router();
const { userList, userPages, errorPage } = require("../views");
const { User, Page } = require("../models");

router.route("/").get(async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.send(userList(allUsers));
  } catch (error) {
    next(error);
  }
});

router.route("/:id").get(async (req, res, next) => {
  try {
    const author = await User.findByPk(+req.params.id);
    if (!author) res.send(errorPage());
    else {
      const authorPages = await Page.findAll({
        where: { authorId: author.id }
      });
      res.send(userPages(author, authorPages));
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

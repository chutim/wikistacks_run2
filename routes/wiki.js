const router = require("express").Router();
const { addPage, wikiPage, main, errorPage, editPage } = require("../views");
const { Page, User } = require("../models");

router.route("/").get(async (req, res, next) => {
  try {
    const allPages = await Page.findAll();
    res.send(main(allPages));
  } catch (error) {
    next(error);
  }
});

router
  .route("/add")
  .get(async (req, res, next) => {
    try {
      res.send(addPage());
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newPage = await Page.create(req.body);
      const [author, wasCreated] = await User.findOrCreate({
        where: {
          name: req.body.name,
          email: req.body.email
        }
      });
      newPage.setAuthor(author);
      res.redirect(`/wiki/${newPage.slug}`);
    } catch (error) {
      next(error);
    }
  });

router
  .route("/:slug")
  .get(async (req, res, next) => {
    try {
      const foundPage = await Page.findOne({
        where: {
          slug: req.params.slug
        }
      });
      if (!foundPage) {
        res.send(errorPage());
      } else {
        const pageAuthor = await foundPage.getAuthor();
        res.send(wikiPage(foundPage, pageAuthor));
      }
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const pageToUpdate = await Page.findOne({
        where: {
          slug: req.params.slug
        }
      });
      await pageToUpdate.update(req.body);
      res.redirect(`/wiki/${req.params.slug}`);
    } catch (error) {
      next(error);
    }
  });

router.route("/:slug/edit").get(async (req, res, next) => {
  try {
    const foundPage = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    const foundAuthor = await User.findOne({
      where: {
        id: foundPage.authorId
      }
    });
    res.send(editPage(foundPage, foundAuthor));
  } catch (error) {
    next(error);
  }
});

router.route("/:slug/delete").get(async (req, res, next) => {
  try {
    const pageToDelete = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    const author = pageToDelete.authorId;
    await pageToDelete.destroy();
    res.redirect(`/users/${author}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

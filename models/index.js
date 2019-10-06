const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false
});
const Op = Sequelize.Op;

const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM("open", "closed")
  }
});

Page.beforeValidate(async page => {
  if (page.title) {
    let newSlug = page.title.replace(/[\W|_]+/g, "_");
    if (newSlug[0] === "_") newSlug = newSlug.slice(1);
    if (newSlug[newSlug.length - 1] === "_") newSlug = newSlug.slice(0, -1);
    page.slug = newSlug;
  } else {
    page.slug = Math.random()
      .toString(36)
      .substring(2);
  }

  //trying to check if the slug is already in use, but for some reason it's just finding itself and returning itself.. even though this is all before validation, so technically this instance shouldn't even be added to the table yet right?
  // async function slugAlreadyExists() {
  //   return await Page.findOne({
  //     where: {
  //       slug: page.slug,
  //       id: { $ne: page.id }
  //     }
  //   });
  // }
  // console.log("slug already have?", slugAlreadyExists());

  // let incrementer = 1;
  // while (slugAlreadyExists()) {
  //   page.slug += `_${incrementer}`;
  //   incrementer++;
  // }
});

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

Page.belongsTo(User, { as: "author" });

module.exports = { db, Page, User };

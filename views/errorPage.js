const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () =>
  layout(html`
    <h2>
      Page Not Found!
    </h2>
    <h4><a href="/wiki">Back To Home</a></h4>
  `);

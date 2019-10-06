const html = require("html-template-tag");
const layout = require("./layout");

//what is the action attribute in <form>?
//"the form-data is sent to the page specified in the action attribute"
//here, when the submit button is hit, it triggers a POST request (see that method="POST" attribute in <form>?)
//that is sent to a .post route handler located at '/wiki/add', which we have.
//the action attribute pretty much just says, here is where this form's action will be sent to. and here, the action is to POST.

//how does this form know to send information when the button is clicked? because the button has an attribute called type='submit'

//BREAKDOWN: information is typed into text areas. the button is clicked, and because it has an attribute called 'type' set equal to 'submit', aka its action is to submit things, the wrapper <form> will grab all of the information from the input elements, attach keys to them based on what their 'name' attribute is set as, package all that up into a POST request (because of its method='POST' attribute), and send this POST request off to /wiki/add (because of its action='/wiki/add/' attribute)

module.exports = () =>
  layout(html`
    <h3>Add a Page</h3>
    <hr />
    <form method="POST" action="/wiki/add">
      <div class="form-group">
        <label for="author" class="col-sm-2 control-label">Author Name</label>
        <div class="col-sm-10">
          <input id="author" name="name" type="text" class="form-control" />
        </div>
      </div>

      <div class="form-group">
        <label for="email" class="col-sm-2 control-label">Author Email</label>
        <div class="col-sm-10">
          <input id="email" name="email" type="text" class="form-control" />
        </div>
      </div>

      <div class="form-group">
        <label for="title" class="col-sm-2 control-label">Page Title</label>
        <div class="col-sm-10">
          <input id="title" name="title" type="text" class="form-control" />
        </div>
      </div>

      <div class="form-group">
        <label for="content" class="col-sm-2 control-label">Content</label>
        <div class="col-sm-10">
          <input id="content" name="content" type="text" class="form-control" />
        </div>
      </div>

      <div class="form-group">
        <label for="status" class="col-sm-2 control-label">Page Status</label>
        <div class="col-sm-10">
          <input
            value="open"
            name="status"
            type="radio"
            class="form-control"
            checked
          />Open
          <input
            value="closed"
            name="status"
            type="radio"
            class="form-control"
          />Closed
        </div>
      </div>

      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  `);

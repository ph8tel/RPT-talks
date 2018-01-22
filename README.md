# Blogmodo
*For best experience, please view this file in the browser*.

You will create a full-stack application that implements several features for a multi-author blogging platform. Your app will eventually display four views:

1. a **Feed** of all the blog posts
2. an individual **Post**
3. a **Create** view for authors to create new posts
4. an **Admin** view for blog administrators to see stats about each post

### Your Tech Stack
- Client: *Your choice* of either [AngularJS](https://angularjs.org) or [React](https://facebook.github.io/react)
- Server: [NodeJS](https://nodejs.org), with the [Express](https://express.js.com) framework
- Database: [MongoDB](https://mongodb.com) with the [Mongoose](https://mongoosejs.com) ODM.
- Additional libraries and tools:
  - Client-side AJAX libraries (if and only if you're using React for your client)
    - [jQuery](https://jquery.com/), for *client-side AJAX requests only*.
    - [Axios](https://github.com/axios/axios), as an optional, promise-based alternative to  jQuery's `$.ajax`
  - [Moment.js](https://momentjs.com/) for reader-friendly date formatting
  - [Place Corgi](http://placecorgi.com/) or [Unsplash Source](https://source.unsplash.com/) for placeholder images

NAME WHICH FRONT END FRAMEWORK YOU WILL BE USING FOR THE ASSESSMENT HERE:
* *[AngularJS or React]*
AngularJS 1.4.9

By design, this assessment contains more work than you will be able to complete in a day,(we'll see) so don't be concerned about not completing all of the steps below. Rather, please work on the following steps **in order**, moving on to the next step only after the one you are working on is complete. **Commit frequently** with informative messages. While there are instructions to commit at the end of each step, these should not be your only commits.

---

### Before You Begin

**Complete these setup tasks**

- [ ] In your terminal, navigate to this assessment's `blogmodo` directory and run `git remote rm origin` to prevent yourself from accidentally pushing your code during the assessment.
- [ ] Run `npm install` inside the `blogmodo` directory to install dependencies.
- [ ] Ensure that the MongoDB process is running on your computer (`mongod`).
- [ ] Create the database by running `npm run db:setup`
- [ ] In `server/index.js`, uncomment the lines of code corresponding to your choice of client-side framework.
- [ ] Serve your application from the provided Node/Express web server.
  - If using Angular, start your application with the command `npm start`.
  - If using React, start your application with two commands, `npm run dev:react` and `npm start`, in two separate terminal tabs. Our `dev:react` script makes use of Webpack. For more information about Webpack, take a look at [the Webpack Docs](https://webpack.github.io/docs).
- [ ] Study the given codebase before beginning the steps below. Consider what's been provided to you, what you'll need to refactor, and what you'll need to create as you work through the steps below.

**WHEN THESE TASKS ARE COMPLETE:** proceed to Step One.

---
### Step One: The Blog Feed View

**Implement the following user story:**
> As a reader, when I load the app, I expect to see a feed (or, list) of all the blog posts.

![part one][one]

**Implement this user story by doing the following:**

- [ ] Refactor the **Feed** component (in either the `angular-client` or `react-client` directory) to dynamically render the sample data in `sample_data.js`. Each object in sample_data represents one blog post.
  - You may create additional components and/or refactor existing components as necessary.
- [ ] Use the [Moment.js](https://momentjs.com) library to display the post dates using relative time - for example, "21 hours ago" or "10 minutes ago."
- [ ] In the Express server `server/index.js`, complete the request handler that will respond to `GET` requests to `/api/blogs` with JSON of the blog posts stored in the database. You should use the Mongoose model exported by `Blog.js` to fetch all of the blogs from the database.
- [ ] Make an AJAX request from your client to the `/api/blogs` route of your server when the App (or Feed) component gets loaded. Replace the sample data in your client with data obtained from your server.
- [ ] Ensure that the blog posts in your feed appear in reverse-chronological order (with the most recent post appearing first in the feed.)

**WHEN THIS STEP IS COMPLETE:** please make a commit with the message "complete step one"

---
### Step Two: The Blog Post View

**Implement the following user stories:**
> As a reader, when I click the headline of a blog post in the feed, I expect to be able to see that entire blog post.

> As a reader, when I click the thumbnail photo of a blog post in the feed, I expect to be able to see that entire blog post.

![part two][two]

**Implement this user story by doing the following:**

  - [ ] Study the comments explaining the workings of the "view switcher" in your chosen client-side framework's `App` component.
    - *For AngularJS*, look at `angular-client/components/app.js`
    - *For React*, look at `react-client/src/index.jsx`
    - **DO NOT** attempt to replace the view switcher with ngRoute/Angular Router or React Router
  - [ ] Refactor your client-side `Feed` component so that when a user clicks on either on the title or thumbnail inmage of a blog post, they are shown the entire blog post. *Note: there are many ways to achieve this - it's a good idea to take a little bit of time to carefully plan.*
  - [ ] Refactor the **Post** component (in either the `angular-client` or `react-client` directory) to render one blog post.
    - You may create or refactor other components as necessary.
    - You may create any new server-side routes as necessary.
  - [ ] Use the [Moment.js](https://momentjs.com) library to display the post dates using relative time - for example, "21 hours ago" or "10 minutes ago."
  - [ ] Ensure that your `Post` properly displays the post as a series of paragraphs.

**WHEN THIS STEP IS COMPLETE:** please make a commit with the message "complete step two"

---

### Step Three: The Admin View, and Tracking Views on our Blog Post

**Implement the following user stories:**
> As a blog administrator, I want to know how many times each story has been viewed.
> As a blog administrator, I want to use a link in the app's nav bar to access the Admin page.

![part three][three]


**Implement these user stories by doing the following:**

- [ ] In your Express server, create a request handler that will respond to a `PATCH` request to the route `/api/blogs/:blogId`. Your request handler should find the blog post in the database with the corresponding `_id`, then increment that blog post's `views` counter.
  - Use Express' `route parameters` to get the `blogId` out of your request URL.
- [ ] Refactor your `Post` component in such a way that every time it is rendered, an AJAX `PATCH` request is made to the server route you have just created.
- [ ] Create a new `Admin` component, which will render a list of blog posts showing. Each item in the list should display the blog post's *title, author, and `views` count*.
  - To aid you in crafting the structure, styling, and layout of the HTML elements in this component, we've provided an HTML "skeleton" for this component. You can find it at `mockups/Admin.html`.
  - You may create or refactor other components as necessary.
- [ ] In the `App` component for your client, refactor the view switcher in such a way that setting the value of `view` will cause your new `Admin` component to be rendered.
- [ ] Refactor the navigation section of the `App` to allow the user to navigate to the `Admin` view by clicking "Admin" in the nav bar at the top of the app.

**WHEN THIS STEP IS COMPLETE:** please make a commit with the message "complete step three"

---

### Step Four: The Create View

**Implement the following user story:**
> As a blog author, I want an editor tool that lets me write and publish new posts

![part four][four]

**Implement this user story by doing the following:**

- [ ] Create a new `Create` component, which will display a form with several inputs: one input each for the _title, author, and imageUrl_ of the post, a `textarea` for the _body_ of the post, and a `button` that will submit the post. Additionally, the `Create` component will display a preview of the blog post, which you'll implement in the next step.
  - To aid you in crafting the structure, styling, and layout of the HTML elements in this component, we've provided an HTML "skeleton" for this component. You can find it at `mockups/Create.html`.
- [ ] In your Express server, create a request handler that will respond to a `POST` request to the route `/api/blogs/`. Your request handler should take the data sent in the body of the request, and use that data to create and save a new blog post to your database.
- [ ] In the `App` component for your client, refactor the view switcher in such a way that setting the value of `view` will cause your new `Create` component to be rendered.
- [ ] Refactor the navigation section of the `App` to allow the user to navigate to the `Create` view by clicking "Write a Post" in the nav bar at the top of the app.
- **NOTE** - You may use the [Place Corgi](http://placecorgi.com/) or [Unsplash Source](https://source.unsplash.com/) services to provide filler images as you implement this component. Don't waste time trying to find images.

**WHEN THIS STEP IS COMPLETE:** plase make a commit with the message "complete step four"

---

### Step Five: Adding Support for Markdown Formatting

**Implement the following user story:**
>As a blog author, I want to use Markdown to format my blog posts

**Implement this user story by doing the following:**

- [ ] Inside `utils/markdownParser.js` in your client directory, write a module that implements a basic Markdown parser. This module should export a function that accepts a string of Markdown-formatted text, and returns that same text but converted into HTML formatting.
  - **DO NOT** use or reference the docs/source code for any existing Markdown Parsing module.
  - For the purpose of this assignment, please only implement these three Markdown features:
    - **bold text** - text wrapped a set of double-asterisks, like this: `this text is normal, **this text should be bold**, and finally this text is normal again`
    - _italicized text_ - text wrapped in a set of underscores, like this: `this text is normal, _this text should be italicized_, and finally this text is normal again`
    - Headers - if a line begins with a pound sign (`#`) character, it should be rendered as a header. Multiple pound signs indicate the level of header, like this:
    ```
      This line is not a header

      # This one should be rendered as an <h1>

      ## This one is an <h2>

      ##### This is an <h5>

    ```
  - Do not implement any additional Markdown features in your parser.
  - Ensure that your Markdown parser is not susceptible to XSS attacks.
- Refactor the `Post` component to make use of your Markdown Parser module.

**WHEN THIS STEP IS COMPLETE:** please make a commit with the message "complete step five"

---

### Step Six: Improving the `Create` View: Live Preview

**Implement the following user story:**
>As a blog author, I want to see a formatted preview of my blog post as I type it.

**Implemment this user story by doing the following:**
- [ ] Refactor your `Create` component to accommodate this new feature.
  - You may create additional components or refactor existing components as necessary.
  - Use your Markdown Parser module from the previous step in your implementation.

**WHEN THIS STEP IS COMPLETE:** please make a commit with the message "complete step six"

---

### Step Seven: Authentication and User Roles


**Implement the following user stories:**
>As the administrator of this site, I want to make sure only I can see post statistics.
>As the administrator of this site, I want to make sure only my authors and I can create posts.
>As the administrator of this site, I want to make sure my readers can only see the blog feed and any individual posts.

**Implement this user story by doing the following:**
- [ ] Add a `Users` schema/model to your database.
- [ ] Add user authentication to your server, with `reader`, `author`, and `admin` roles.
- [ ] Create components that allow for user sign-in and account creation.
- [ ] Prevent users from being able to see views that are beyond their role's level of permissions.
- [ ] Remove the `author` input from the `Create` component, use the signed-in user's username in the AJAX request that saves a blog post to the database.
- [ ] Create or refactor any other schemas, models, API routes, client components, or helper utilities as necessary.

**WHEN THIS STEP IS COMPLETE:** please make a commit with the message "complete step seven"

---

### Step Eight: Tracking Users' Activity on the Site

**Implement the following user stories:**
>As a reader, I want to see recommendations for what posts to check out next
>As a reader, I want recommended posts to be relevant to my interests and activities on this blog

**Implement these user stories by doing the following:**
- [ ] Create or refactor any schemas, models, API routes, client components, or helper utilities as necessary.

**WHEN THIS STEP IS COMPLETE:** please make a commit with the message "complete step eight"

---

### Step Nine: Improving the `Feed` View: Featured Posts

**Implement the following user stories:**
> As a reader, I expect more important stories to take up more space in the blog feed.
> As an admin, I want to mark certain posts as "featured" to make them stand out in the blog feed.

**Implement these user stories by doing the following:**
- [ ] Create or refactor any schemas, models, API routes, client components, or helper utilities as necessary.

**WHEN THIS STEP IS COMPLETE:** please make a commit with the message "complete step nine"

---

### Step Ten: Improving the `Admin` View: Sortable/Filterable Table

**Implement the following user stories:**
> As an admin, I want to see metrics about my posts in a table that can be sorted and filtered.

**Implement these user stories by doing the following:**
- [ ] Create or refactor any schemas, models, API routes, client components, or helper utilities as necessary.

**WHEN THIS STEP IS COMPLETE:** please make a commit with the message "complete step ten"

---

## Available Resources

* [Postman](https://www.getpostman.com/)
* [AngularJS Docs](https://angularjs.org/)
* [ReactJS Docs](https://facebook.github.io/react/)
* [Webpack Docs](https://webpack.github.io/docs/)
* [Babel Docs](https://babeljs.io/docs/setup/)
* [jQuery Docs](https://jquery.com/)
* [axios Docs](https://github.com/axios/axios)
* [Underscore Docs](http://underscorejs.org/)
* [BluebirdJS Docs](http://bluebirdjs.com/)
* [NodeJS Docs](https://nodejs.org/)
* [ExpressJS Docs](https://expressjs.com/)
* [Body Parser Middleware Docs](https://github.com/expressjs/body-parser)
* [MongoDB docs](https://docs.mongodb.com/)
* [Mongoose docs](http://mongoosejs.com/)
* Docs for any npm packages you might use
* [MDN](https://developer.mozilla.org/)
* [Stack Overflow](http://stackoverflow.com/)
* [Google Search](https://google.com) to search for the correct page on any of the documentation above

[one]: mockups/step_one.gif
[two]: mockups/step_two.gif
[three]: mockups/step_three.gif
[four]: mockups/step_four.gif

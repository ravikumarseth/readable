# Readable API Server

In this project a content and comment web app is built. Users is be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

## Getting Started

* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server`

* In another terminal window, install and start the React App project
    - `cd frontend`
    - `npm install`
    - `npm start`

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).

## App Features

  - In the beginning the user is sent to the homepage of the app, the user can navigate back to homepage from any other page by clicking on the **Ugly Readable App** text at the top of the page.
  - In the beginning the user is also set to view all posts. The user may click on the category names namely, *All*, *React*, *Redux* or *Udacity*, for viewing posts specific to that category.
  - The user may click on **Make a New Post** to create a new post by filling the details on the next page.
  - The user may sort the visible posts by clicking on any of the 4 sort buttons for sorting posts based on time when they were created or according to vote score in ascending or decending order.
  - The user may also click *Edit* or *Delte* and follow futher instructions for editing or deleting the post.
  - The user may *Up Vote* or *Down Vote* any post by clicking on the **+** and **-** buttons.
  - The user may view the details of the post and comments(if any) by clicking on the name of the post, the user is taken to the post detail page on click.
  - On the post detail page, the user may write a new comment or Up Vote, Down Vote, Edit, Delete any comment by clicking on the respective buttons and then following the instructions further. The user can also sort comments based on time or vote score of comments.
  - The user may also delete the post from post delete page.
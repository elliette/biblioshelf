# Biblioshelf

Biblioshelf is an all-in-one tool that lets readers keep track of all the books that they've read, and all the books that they hope to read. Readers can add a new book with just the click of a button, take notes on each book with Markdown, favorite books that they love, and toggle between viewing all the books that they've read and all the books that they've saved to read later.

## Technologies: 

Biblioshelf is a single-page application built atop a RESTful API. Its backend was created with Node and Express, with a PostgreSQL database and Sequelize as its ORM. React, React Router, and React-Redux power Biblioshelf's frontend. Biblioshelf is integrated with the Google Books API to fetch book metadata for its users. Finally, Biblioshelf uses bcrypt for its user authentication.

## Images of the Application: 
![View of Books Read List](books_read.jpg "View of Books Read List")
![View of To Read List](to_read.jpg "View of To Read List")
![View of Books Sorted by Year](by_year.jpg "Books Sorted by Year")
![Book Detail View](book_detail.jpg "Book Detail View")
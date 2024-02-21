# Blog Application using MERN Stack

## Description
This is a simple blog application built with the MERN stack (MongoDB, Express.js, React, and Node.js). It allows users to create, read, update, and delete blog posts. Users can sign up, log in, and manage their posts.

## Features
- **User Authentication:**
  - Users can sign up with a username and password.
  - Users can log in to access the application.
- **Blog Posts:**
  - Users can create new blog posts with a title, summary, content, and cover image.
  - Users can view a list of all blog posts.
  - Users can view individual blog posts with their details.
  - Users can edit and delete their own blog posts.
- **Timestamps:**
  - Each blog post includes timestamps for creation and last update.

## Technology Stack
- **Frontend:**
  - React
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (using Mongoose)
- **User Authentication:**
  - JSON Web Tokens (JWT)

## Setup Instructions
1. Clone the repository:
2. Install dependencies:
3. Set up environment variables:
- Create a `.env` file in the root directory.
- Define the following variables:
  ```
  PORT=3000
  MONGODB_URI=<your-mongodb-uri>
  JWT_SECRET=<your-jwt-secret>
  ```
4. Start the development server:
5. Visit `http://localhost:3000` in your browser to view the application.

## Database Schema
The application uses MongoDB as its database. Here's the schema for the collections:

### Users Collection:
- **_id**: ObjectId
- **username**: String
- **password**: String

### Posts Collection:
- **_id**: ObjectId
- **title**: String
- **summary**: String
- **content**: String
- **cover**: String
- **author**: ObjectId (reference to the user who created the post)
- **createdAt**: Date
- **updatedAt**: Date

## License
[MIT License](LICENSE)

## Contributing
Contributions are welcome. Please create an issue or submit a pull request if you find any bugs or want to suggest improvements.


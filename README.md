# PS_MOD2_SERVER


# ENV VARIABLES: 
PORT
MONGODB_URI
SALT
JWT_SECRET

# Instructions on Installing & Running Locally

Clone or fork this project 

Install packages : 
-bcrypt
-dotenv
-express
-helmet
-jsonwebtoken
-mongoose
-morgan

# Endpoints

/auth - Finds users, and verifies tokens
/auth/register - Registers and posts new users and details
/auth/login - Verifies and allows users to log in

/blog - finds all public blogs
/blog/:username - finds blogs my user
/blog/username.post - posts blogs
/blog/:id - finds all blogs by id
/blog/:id.put - finds and updates blogs by their id
/blog/:id.delete - finds and deletes blogs by their id

# Schemas 
-Blog Schema
        - created_by: string, required
        - created_at: date, required
        - blog_title: string, required
        - blog_content: string, required
        - blog_content: string, required
        - private: boolean, required

 - User Schema
        - username: string, required
        - email: string, required
        - birthday: date, required
        - age: number
        - password: string, required
# movie-app
Build an API for a movie lobby for OTT applications. The lobby has a collection of movies with
genre, rating, and streaming link. The API should allow users to:
1. List all the movies in the lobby
2. Search for a movie by title or genre
3. Add a new movie to the lobby
4. Update an existing movie information (title, genre, rating, or streaming link)
5. Delete a movie from the lobby

## To start application

Pre-Requisite
Start Mongodb Server.
Create a db named ```movie-lobby```.
Add Users in User collection with following details
```
{
    name: 'User1',
    role: 'ADMIN',
    email_id: 'user1@abc.com',
    mobile_no: '8888899999',
    password: 'Password@123',
};
{
    name: 'User2',
    role: 'STANDARD',
    email_id: 'user2@abc.com',
    mobile_no: '9999988888',
    password: 'Password@123',
};
```
To generate jwt token use - https://jwt.io/
Below is the screenshot for the changes
<img width="1259" alt="Screenshot 2024-01-12 at 2 09 15 PM" src="https://github.com/pranjal2018201094/movie-app/assets/42588172/0e876337-6274-40bd-a234-fa286f8369c8">

Import postman collection from Repo.

Steps
Run make bootstrap on terminal.
Run 'yarn start' on terminal.
Hit apis from postman
To Run the test cases 'yarn test'

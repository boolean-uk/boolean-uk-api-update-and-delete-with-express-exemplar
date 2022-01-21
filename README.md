# Update and Delete with Express

Build an **updateOneById** and **deleteOneById** controller for the Books and Pets database.

## Setup

1. Clone the repository that you forked for the previous exercise (https://github.com/boolean-uk/boolean-uk-api-read-with-express)
2. In the root directory, type `npm install`, which installs dependencies for the project
3. Create the file `.env` in the root directory. It should contain a single line, which contains the environment variable used to specify the url from the instance created in the previous exercise.
4. Type `npm start`, which starts a development server that will reload whenever you make any changes to source files.

## Instructions

- Build the `updateOneById` controller for the Books and Pets resource
- Build an `updateOneByTitle` controller for the Books resource
- Build an `updateOneByName` controller for the Pets resource
- Build the `deleteOneById` controller for the Books and Pets resource

## Tips

- Use ElephantSQL to test your SQL queries and to see if the requests you are going to make from within your models will succesfully update and delete rows in the database.

## Challenge 1

- Add validation in your update controller that sends a useful message back to the client when there's an error, with suggestions as to what they could do differently.

## Challenge 2

- Build a new resource from scratch

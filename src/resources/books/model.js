const db = require("../../utils/database");
const { buildBooksDatabase } = require("../../utils/mockData");

function Book() {
  function createTable() {
    const sql = `
      DROP TABLE IF EXISTS books;
      
      CREATE TABLE IF NOT EXISTS books (
        id              SERIAL        PRIMARY KEY,
        title           VARCHAR(255)   NOT NULL,
        type            VARCHAR(255)   NOT NULL,
        author          VARCHAR(255)   NOT NULL,
        topic           VARCHAR(255)   NOT NULL,
        publicationDate DATE           NOT NULL
      );
    `;

    return db
      .query(sql)
      .then((result) => console.log("[DB] Book table ready."))
      .catch(console.error);
  }

  function mockData() {
    const createBook = `
      INSERT INTO books
        (title, type, author, topic, publicationDate)
      VALUES
        ($1, $2, $3, $4, $5)
    `;

    const books = buildBooksDatabase();

    books.forEach((book) => {
      db.query(createBook, Object.values(book)).catch(console.error);
    });
  }

  createTable().then(() => {
    console.log("\nCreating mock data for Books...\n");

    mockData();
  });
}

async function createBook(bookData) {
  const createOneSQL = `
    INSERT INTO books 
      (title, type, author, topic, publicationDate) 
    VALUES 
      ($1,$2,$3,$4,$5) 
    RETURNING *;`;

  let createResult = {}

  await db.query(createOneSQL, [bookData.title, bookData.type, bookData.author, bookData.topic, new Date(bookData.publicationDate)])
    .then(result => createResult = result.rows[0])
    .catch(error => {
      createResult = {
        error: {
          message: "DB error, could not create book: " + error.message,
          bookToCreate: bookData,
          code: error.code
        }
      }
    });

  return createResult;
}

async function getAllBooks() {
  const SQL = `SELECT * FROM books;`;

  let getResult = {}

  await db.query(SQL)
    .then(result => getResult = result.rows)
    .catch(error => {
      getResult = {
        error: {
          message: "DB error, could not fetch all books: " + error.message,
          code: error.code
        }
      }
    });

  return getResult;
}

async function getBookByID(bookId) {
  const SQL = `SELECT * FROM books WHERE id=$1;`;

  let getResult = {}

  await db.query(SQL, [bookId])
    .then(result => getResult = result.rows)
    .catch(error => {
      getResult = {
        error: {
          message: "DB error, could not fetch book with id=" + bookId.toString() + ": " + error.message,
          code: error.code
        }
      }
    });

  return getResult;
}

async function getBooksByType(bookType, topic="") {
  let SQL = `SELECT * FROM books WHERE LOWER(type)=$1;`;
  const SQLWithTopic = `SELECT * FROM books WHERE LOWER(type)=$1 AND topic=$2;`;
  let queryData = [bookType.toLowerCase()];
  if(topic && topic.length > 0) {
    SQL = SQLWithTopic;
    queryData.push(topic.toLowerCase());
  }

  

  let getResult = {}

  await db.query(SQL, queryData)
    .then(result => getResult = result.rows)
    .catch(error => {
      getResult = {
        error: {
          message: "DB error, could not fetch books by type: " + error.message,
          queryParams: queryData,
          code: error.code
        }
      }
    });

  return getResult;
}

module.exports =  {Book, createBook, getAllBooks, getBookByID, getBooksByType};

import { storageService } from "./async-storage-service.js";
import { utilService } from "./util-service.js";
import bookList from "./book-list.js";

const BOOKS_KEY = "missBooksDB";
createBooks();

export const bookService = {
  query,
  remove,
  get,
  save,
  addReview,
  removeReview,
  getBooksFromGoogle,
  addBookFromGoogle
};

function query() {
  return storageService.query(BOOKS_KEY);
}

function remove(bookId) {
  return storageService.remove(BOOKS_KEY, bookId);
}

function get(bookId) {
  return storageService.get(BOOKS_KEY, bookId);
}

function addReview(bookId, review) {
  return get(bookId).then((book) => {
    review.id = storageService.makeId();
    if (!Array.isArray(book.reviews)) book.reviews = [];
    book.reviews.push(review);
    return storageService.put(BOOKS_KEY, book);
  });
}

function save(book) {
  if (book.id) return storageService.put(BOOKS_KEY, book);
  else return storageService.post(BOOKS_KEY, book);
}

function removeReview(book, reviewId) {
  const idx = book.reviews.findIndex((review) => review.id === reviewId);
  book.reviews.splice(idx, 1);
  return storageService.put(BOOKS_KEY, book);
}

function createBooks() {
  const books = storageService.query(BOOKS_KEY).then((books) => {
    if (!books || !books.length)
      storageService.postMany(BOOKS_KEY, bookList);
  });
}

function getBooksFromGoogle(bookName) {
  console.log('bookName',bookName);
  const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${bookName}`
  return getFromAPI(url)
}

function getFromAPI(url) {
  return axios.get(url)
  .then(res => res.data.items)
  .then(items => {
    console.log('items',items)
    return items
})
}

function addBookFromGoogle(book) {
  var newBook = {
    title: book.title,
    subtitle: book.subtitle,
    authors: [...book.authors],
    categories: [...book.categories],
    publishedDate: book.publishedDate,
    language: book.language,
    description: utilService.makeLorem(utilService.getRandomIntInclusive(10, 40)),
    pageCount: 240,
    thumbnail: book.imageLinks.thumbnail,
    listPrice: {amount: utilService.getRandomIntInclusive(20, 240), currencyCode: "USD", isOnSale: false}
}
  storageService.post(BOOKS_KEY, newBook)
}
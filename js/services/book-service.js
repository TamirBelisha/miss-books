import { storageService } from "./async-storage-service.js";
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
      storageService.saveToStorage(BOOKS_KEY, bookList);
  });
}

// function addReview(bookId, review) {
//     var booksFromStorage
//     // const review = Object.assign({}, review);
//     query().then(books => booksFromStorage = books).then(
//         get(bookId).then(book => {
//             if (book.reviews) book.reviews.push(review)
//             else book.reviews = [review]
//             var idx = booksFromStorage.findIndex(b => b.id === bookId)
//             booksFromStorage[idx] = book
//             storageService.saveToStorage(BOOKS_KEY, booksFromStorage)
//         })
//     )
// }

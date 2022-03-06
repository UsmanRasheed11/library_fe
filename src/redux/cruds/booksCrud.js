import axios from "../../utils/axios";

export const BOOKS_URL = "/books";

// CREATE =>  POST: add a new customer to the server
export function createBook(book) {
  return axios.post(BOOKS_URL, { book });
}

// READ
export function getAllBooks() {
  return axios.get(BOOKS_URL);
}

export function getAllBooksFull() {
  return axios.get(`${BOOKS_URL}`);
}

export function getBookById(bookId) {
  return axios.get(`${BOOKS_URL}/${bookId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findBooks(queryParams) {
  return axios.post(`${BOOKS_URL}`, { queryParams });
}

// UPDATE => PUT: update the customer on the server
export function updateBook(book) {
  return axios.put(`${BOOKS_URL}`, { book });
}

// UPDATE Status
export function updateStatusForBooks(ids, status) {
  return axios.post(`${BOOKS_URL}/updateStatusForBooks`, {
    ids,
    status,
  });
}

// DELETE => delete the customer from the server
export function deleteBook(bookId) {
  return axios.delete(`${BOOKS_URL}/${bookId}`);
}

// DELETE Customers by ids
export function deleteBooks(ids) {
  return axios.post(`${BOOKS_URL}/deleteBooks`, { ids });
}

import * as requestFromServer from "../cruds/booksCrud";
import { booksSlice, callTypes } from "../slices/booksSlice";

const { actions } = booksSlice;

export const fetchBooks = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllBooksFull()
    .then((response) => {
      const entities = response.data;
      dispatch(
        actions.booksFetched({
          totalCount: entities?.length || 0,
          entities: entities || [],
        })
      );
    })
    .catch((error) => {
      error = "Can't find books";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchBook = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.bookFetched({ bookForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getBookById(id)
    .then((response) => {
      const book = response.data;
      dispatch(actions.bookFetched({ bookForEdit: book }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find book";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteBook = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBook(id)
    .then((response) => {
      dispatch(actions.bookDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete book";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createBook = (bookForCreation) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createBook(bookForCreation)
    .then((response) => {
      const { book } = response.data;
      dispatch(actions.bookCreated({ book }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create book";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateBook = (bookForUpdate) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateBook(bookForUpdate)
    .then((response) => {
      const { book } = response.data;
      dispatch(actions.bookUpdated({ book }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update book";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateBooksStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForBooks(ids, status)
    .then(() => {
      dispatch(actions.booksStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update book status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteBooks = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteBooks(ids)
    .then(() => {
      dispatch(actions.booksDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete books";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

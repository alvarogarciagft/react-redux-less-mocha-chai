import * as types from 'constants/ActionTypes';
import API from 'api/API';

/**
 * Action creator for redirecting
 * @param url
 */
export function redirectTo(url) {
  return {
    type: types.UPDATE_URL,
    payload: {
      method: 'push',
      args: url
    }
  };
}

/**
 * Action creator that changes something
 * @param something
 */
export function changeSomething(something) {
  return {
    type: types.CHANGE_SOMETHING,
    payload: {
      something
    }
  };
};

/**
 * Action creator that changes something asynchronous
 * @param something
 */
export function changeSomethingAsync(something) {
  return (dispatch, getState) => {
    let api = new API();
    return api.getSomething(something).then(
      (response) => {
        dispatch({
          type: types.CHANGE_SOMETHING,
          payload: {
            something: response.data
          }
        });
        dispatch(redirectTo('/'));
      },
      (error) => {
        dispatch({
          type: types.CHANGE_SOMETHING,
          payload: error,
          error: true
        });
      }
    );
  };
};

export function loadBooks() {
  return (dispatch) => {
    let api = new API();
    return api.loadBooks().then(
      (response) => {
        dispatch({
          type: types.SET_BOOKS,
          payload: response.data
        });
        console.log(response);
      }
    );
  };
};

export function createBook(book) {
  return (dispatch) => {
    let api = new API();
    return api.createBook(book).then(
      (response) => {
        dispatch({
          type: types.CREATE_BOOK,
          payload: book
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

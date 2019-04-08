import axios from 'axios';

import {
  GET_ERRORS,
 // ADD_ITEM,
  CLEAR_ERRORS,
  GET_ITEM,
  GET_ITEMS,
  GET_CATEGORIES,
  ITEM_LOADING,
  CATEGORY_LOADING
} from './types';

// Add Item
export const addItem = (itemData, history) => dispatch => {
  dispatch(clearErrors());
  console.log('itemActions');
  console.log(itemData);
  axios
    .post('/api/items/create', itemData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get All Items
export const getItems = () => dispatch => {
  console.log('action get All Items');
  dispatch(setItemLoading());
  axios
    .get('/api/items')
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Item
export const getItem = id => dispatch => {
  console.log('action get Items');
  dispatch(setItemLoading());
  axios
    .get(`/api/items/${id}`)
    .then(res =>
      dispatch({
        type: GET_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get All Categories
export const getCategories = () => dispatch => {
  console.log('action get All Categories');
  dispatch(setCategoryLoading());
  axios
    .get('/api/items/categories')
    .then(res =>{
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data
      });}
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setItemLoading = () => {
  return {
    type: ITEM_LOADING
  };
};

// Set loading state
export const setCategoryLoading = () => {
  return {
    type: CATEGORY_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
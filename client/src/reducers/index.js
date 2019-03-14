import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import itemReducer from './itemReducer';
import categoryReducer from './categoryReducer';

export default combineReducers ({
	auth: authReducer,
	errors: errorReducer,
	item: itemReducer,
  	category: categoryReducer
});
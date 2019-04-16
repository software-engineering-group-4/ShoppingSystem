import {
  GET_ITEM,
  GET_ITEMS,
  ITEM_LOADING,
  DELETE_ITEM,
  CLEAR_CURRENT_ITEM
} from '../actions/types';

const initialState = {
  item: [],
  items: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ITEM_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ITEM:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_ITEM:
      return {
        ...state,
        item: null
      };
    default:
      return state;
  }
}
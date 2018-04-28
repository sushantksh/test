import { combineReducers } from 'redux';
import authReducer from './authReducer';
import moviesReducer from './moviesReducer';
import adminReducer from './adminReducer';
import userReducer from './userReducer';
import revenueReducer from './revenueReducer';

export default combineReducers({
  auth: authReducer,
  movies: moviesReducer,
  admin: adminReducer,
  user: userReducer,
  revenue: revenueReducer
});

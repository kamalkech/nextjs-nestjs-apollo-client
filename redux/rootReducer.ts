import { combineReducers } from 'redux';
import BlogReducer from './blog/reducers';

const rootReducer = combineReducers({
  blog: BlogReducer,
});

export default rootReducer;

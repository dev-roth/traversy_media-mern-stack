import { combineReducers } from 'redux';
import itemReducer from './itemReducer';

// combines separate reducers (that manage individual parts of the global state) in a central object (root reducer) 
// and provides access to them via properties (here: one reducer).
export default combineReducers({
    item: itemReducer
});
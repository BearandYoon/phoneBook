/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import {
  LOAD_RESULT,
  LOAD_RESULT_SUCCESS,
  LOAD_RESULT_FAIL,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: true,
  changingStatus: false,
  loadError: '',
})
  .set('result', {});

function resultReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_RESULT:
      return state
        .set('loading', true)
        .set('loadError', '')
        .set('result', {});
    case LOAD_RESULT_SUCCESS:
      return state
        .set('loading', false)
        .set('result', action.payload);
    case LOAD_RESULT_FAIL:
      return state
        .set('loading', false)
        .set('loadError', action.error);
    default:
      return state;
  }
}

export default resultReducer;

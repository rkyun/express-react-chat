import { combineReducers } from 'redux';
import appReducer from './app_reducer';
import usersReducer from './users_reducer';

import { reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  app: appReducer,
  form: formReducer,
  users: usersReducer
})

export default rootReducer;
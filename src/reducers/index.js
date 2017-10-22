import { combineReducers } from 'redux';
import appReducer from './app_reducer';
import { reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  app: appReducer,
  form: formReducer
})

export default rootReducer;
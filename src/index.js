import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import './index.css';
import MessangerChat from './components/messanger/messanger';
import reducers from './reducers';
//import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware()(createStore);



ReactDOM.render(
<Provider store={createStoreWithMiddleware(reducers)}>
  <MessangerChat />
</Provider>
, document.getElementById('root'));
// registerServiceWorker();

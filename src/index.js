import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import './index.css';
import Messanger from './components/messanger/messanger';
import JoinRoom from './components/join_room/join-room';
import reducers from './reducers';

//import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware()(createStore);



ReactDOM.render(
<Provider store={createStoreWithMiddleware(reducers)}>
  <Router>
    <div>
      <Route exact path="/" component={JoinRoom} />
      <Route exact path="/chat" component={Messanger} />
    </div>
  </Router>
</Provider>
, document.getElementById('root'));
// registerServiceWorker();

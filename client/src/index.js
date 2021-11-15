import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import actionCable from 'actioncable'
import * as serviceWorker from './serviceWorker';
import allReducers from './states/allReducers';
import {createStore} from 'redux';

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const CableApp = {}
CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable') // change to whatever port your server uses
export const ActionCableContext = createContext()

ReactDOM.render(
  <Provider store={store}> 
    // omitted any other providers we may have
    <ActionCableContext.Provider value={CableApp.cable}>
      <App />
    </ActionCableContext.Provider>,
  </Provider>,
  document.getElementById('root')
)

//sudo service postgresql start

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

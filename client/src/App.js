import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
// import Login from './components/Login';
// import Register from './components/Register';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import Routes from './components/Routes';


// Store Creation and Setup for global state management 
const initialState = {};
const middleware = [thunk];
const composeEnhancers = 
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancers = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(rootReducer, initialState, enhancers);

// Testing
const sampleFireteam = {
  "leader": "Test",
  "console": "PS4"
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

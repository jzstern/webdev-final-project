import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux'
import App from './App'
import rootReducer from './reducers/root.reducer'


const store = createStore(
		// (state = {}) => state,
		rootReducer,
		compose(
			applyMiddleware(thunk),
			window.devToolsExtension ? window.devToolsExtension() : f => f
		)
)

ReactDOM.render(
	<Provider store={store}>
    <App/>
	</Provider>,
	document.getElementById('root')
)
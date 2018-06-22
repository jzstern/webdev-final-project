import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'
import App from './App'



let store = createStore(
		(state = {}) => state,
		applyMiddleware(thunk)
	)

ReactDOM.render(
	<Provider store={store}>
    <App/>
	</Provider>,
	document.getElementById('root')
)
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'

// let store = createStore()

import App from './App'

ReactDOM.render(
  <App/>,
	document.getElementById('root')
)

export default App

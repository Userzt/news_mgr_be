import React/* , { Component } */ from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';

//axios
// import { get, post } from './utils/http';
// import api from './utils/api';

//redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducer';
const store = createStore(reducer);

//在react的原型链上，绑定get和post方法
// Component.prototype.get = get;
// Component.prototype.post = post;
// Component.prototype.api = api;


ReactDOM.render(

  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

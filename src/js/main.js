import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Old from './Old.js';

window.addEventListener('load', function(event) {
	ReactDOM.render(<App/>, document.getElementById('root'));
	Old();
});

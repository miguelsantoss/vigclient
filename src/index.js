import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routes';
import Root from './containers/Root';
import 'semantic-ui-css/semantic.min.css';

const mountNode = document.getElementById('root');
const render = (NewApp) => ReactDOM.render(<NewApp />, mountNode);

render(Router);

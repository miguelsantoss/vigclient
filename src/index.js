import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import Root from './components/containers/Root';
import store from './store';
import registerServiceWorker from './utils/registerServiceWorker';

const mountNode = document.getElementById('root'); // eslint-disable-line no-undef
// eslint-disable-next-line react/no-render-return-value
const render = NewApp => ReactDOM.render(<NewApp store={store} />, mountNode);
render(Root);

registerServiceWorker();


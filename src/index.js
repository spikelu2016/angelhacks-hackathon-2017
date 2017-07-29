import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import Routes from './containers/routes'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './styles/main.scss';

ReactDOM.render(
<MuiThemeProvider>
  <BrowserRouter>
      <Routes />
  </BrowserRouter>
</MuiThemeProvider>,
  document.getElementById('root')
);

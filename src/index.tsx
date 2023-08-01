import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';

// This is the root of the application 
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// The app is rendered here
root.render(
  <React.Fragment>
      <App />
  </React.Fragment>
);




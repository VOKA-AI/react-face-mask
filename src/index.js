import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import App from './App2';
import reportWebVitals from './reportWebVitals';
import { show_camera_and_detect_face } from './face_detect';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <App />,
);
show_camera_and_detect_face()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

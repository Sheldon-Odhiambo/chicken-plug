
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';

// const rootElement = document.getElementById('root');
// if (!rootElement) {
//   throw new Error("Could not find root element to mount to");
// }

// const root = ReactDOM.createRoot(rootElement);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("🟢 index.tsx loaded");

const rootElement = document.getElementById('root');
console.log("🟢 root element:", rootElement);

if (!rootElement) {
  throw new Error("❌ Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
console.log("🟢 React root created");

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log("🟢 App render called");

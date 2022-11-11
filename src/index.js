import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AboutPage from './component/about/About';
import ErrorPage from './component/routes/ErrorPage';
import MapContainer from './component/MapContainer';
import DataTablePage from './component/datatable/DataTable';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path:'/',
    element:<MapContainer />,
    errorElement:<ErrorPage />
  },
  {
    path: '/about',
    element:<AboutPage/>
  },
  {
    path:'/datatable',
    element:<DataTablePage/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <Router>
  //   <App />
  // </Router>
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

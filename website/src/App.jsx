import { useState } from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './Pages/Home';
import Layout from './Pages/Layout';

const router = createBrowserRouter([{
  path: '/',
  element: <Layout />,
  errorElement: <h1>404</h1>,
  children: [
    {path: '', element: <Home />},
  ]
}]);


function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App

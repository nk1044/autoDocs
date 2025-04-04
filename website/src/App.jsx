import { useState } from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './Pages/Home';
import Layout from './Pages/Layout';
import Page404 from './Pages/Page404';

const router = createBrowserRouter([{
  path: '/',
  element: <Layout />,
  children: [
    {path: '', element: <Home />},
  ]
},
{path: '*', element: <Page404 />},
]);


function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App

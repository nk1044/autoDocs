import { useState } from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './Pages/Home';
import Layout from './Pages/Layout';
import Page404 from './Pages/Page404';
import Docs from './Pages/Docs';


const router = createBrowserRouter([{
  path: '/',
  element: <Layout />,
  children: [
    {path: '', element: <Home />},
    {path: 'docs/:path', element: <Docs />},
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

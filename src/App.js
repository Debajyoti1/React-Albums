import React from 'react';
import './App.css';
import {AlbumList} from './components/albums/Albums'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Error404 from './pages/Error404'
import { AddEdit } from './components/addEdit/AddEdit';
function App() {
  const browserRouter=createBrowserRouter([
    {
      path: '/',
      element: <AlbumList />,
      errorElement: <Error404 />
    },
    {
      path: '/addedit',
      element: <AddEdit />
    }
  ])
  return (
    <RouterProvider router={browserRouter} />
  );
}

export default App;

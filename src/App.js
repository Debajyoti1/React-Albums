import React from 'react';
import './App.css';
import {AlbumList} from './components/albums/Albums'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Error404 from './pages/Error404'
function App() {
  const browserRouter=createBrowserRouter([
    {
      path: '/',
      element: <AlbumList />,
      errorElement: <Error404 />
    }
  ])
  return (
    <RouterProvider router={browserRouter} />
  );
}

export default App;

import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid, Typography } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import Layout from './components/layout';
import router from './router';
import { Provider } from 'react-redux';
import store, { useDispatch } from './redux/store';
import { autoLogin } from './utils';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  return <RouterProvider router={router} />;
}

export default App;

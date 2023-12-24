import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout';
import Auth from '../pages/auth';
import Signin from '../components/auth/signin';
import Register from '../components/auth/register';
import { Grid, Typography } from '@mui/material';
import Customer from '../pages/customer';
import LendingForm from '../components/customer/lending-form';
import ExistingLoans from '../components/customer/existing-loans';
import Admin from '../pages/admin';
import ListLoans from '../components/admin/list-loans';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Auth />,
        children: [
          {
            path: '',
            element: <Signin />
          },
          {
            path: 'register',
            element: <Register />
          }
        ]
      },
      {
        path: 'consumer',
        element: <Customer />,
        children: [
          {
            path: 'new-loan',
            element: <LendingForm />
          },
          {
            path: 'check-existing-loan',
            element: <ExistingLoans />
          }
        ]
      },
      {
        path: '/admin',
        element: <Admin />,
        children: [
          {
            path: '',
            element: <ListLoans />
          }
        ]
      }
    ]
  }
]);

export default router;

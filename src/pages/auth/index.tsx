import React, { useEffect } from 'react';
import { Button, Divider, Grid } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from '../../redux/store';

const Auth = () => {
  const { pathname } = useLocation();
  const { isLoggedIn, data } = useSelector(state => state.user);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      if (state?.pathname) {
        navigate(state.pathname + state.search);
      } else {
        if (data.user_type === 'admin') {
          navigate('/admin');
        } else {
          navigate('/consumer/new-loan');
        }
      }
    }
  }, [isLoggedIn, data]);

  return (
    <Grid
      sx={{
        width: { xs: '350px', md: '400px' },
        // height: '500px',
        borderRadius: '20px',
        background:
          'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(51, 50, 50, 0.12) 100%)',
        backdropFilter: 'blur(20px)',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <Button
          sx={{
            background: 'white',
            color: 'black',
            textAlign: 'center',
            padding: '5px 10px',
            fontWeight: '500',
            borderRadius: '3px',
            cursor: 'pointer',
            width: '100%',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.8)'
            }
          }}
          startIcon={<GoogleIcon />}
        >
          {pathname === '/' ? 'Sign in' : 'Register'}
        </Button>
        <Button
          sx={{
            background: 'white',
            color: 'black',
            textAlign: 'center',
            padding: '5px 10px',
            fontWeight: '500',
            borderRadius: '3px',
            cursor: 'pointer',
            width: '100%',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.8)'
            }
          }}
          startIcon={<TwitterIcon />}
        >
          {pathname === '/' ? 'Sign in' : 'Register'}
        </Button>
      </Grid>
      <Divider
        sx={{
          my: '20px',
          '&::before,::after': {
            borderColor: '#ffffff99'
          }
        }}
      >
        OR
      </Divider>
      <Grid>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Auth;

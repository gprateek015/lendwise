import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from '../../redux/store';

const Customer = () => {
  const { isLoggedIn } = useSelector(state => state.user);
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/', {
        state: {
          pathname,
          search
        }
      });
    }
  }, [isLoggedIn]);

  return (
    <Grid
      sx={{
        width: { xs: '350px', md: '400px' },
        height: '500px',
        borderRadius: '20px',
        background:
          'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(51, 50, 50, 0.12) 100%)',
        backdropFilter: 'blur(20px)',
        padding: '30px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <Outlet />
    </Grid>
  );
};

export default Customer;

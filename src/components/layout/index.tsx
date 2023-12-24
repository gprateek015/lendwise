import React from 'react';
import {
  // Button,
  Grid,
  IconButton,
  Typography,
  useMediaQuery
} from '@mui/material';
import Typewriter from 'typewriter-effect';
import { Outlet } from 'react-router-dom';
import { scrollToBottom } from '../../utils';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { useDispatch, useSelector } from '../../redux/store';
import { logout } from '../../redux/slice/user';
import Button from '../custom-button';

const Layout = () => {
  const dispatch = useDispatch();
  const isLaptop = useMediaQuery('(min-width:900px)');
  const { isLoggedIn } = useSelector(state => state.user);

  return (
    <Grid
      sx={{
        background: `linear-gradient(${
          isLaptop ? '45deg' : '120deg'
        }, black, #430f4c)`,
        minHeight: '100vh',
        minWidth: '100vw',
        color: 'white',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      {isLaptop && isLoggedIn && (
        <Button
          onClick={() => dispatch(logout())}
          sx={{
            position: 'fixed',
            top: { xs: '10px', md: '40px' },
            right: { xs: '20px', md: '40px' },
            width: '150px'
          }}
        >
          Logout
        </Button>
      )}
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100vh',
          position: 'relative'
        }}
      >
        <Typography
          sx={{
            fontWeight: '600',
            fontSize: '50px',
            color: 'transparent',
            background: 'linear-gradient(247deg, #4a0071, #9f8fa5)',
            backgroundClip: 'text'
          }}
        >
          LendWise
        </Typography>
        <Typography
          sx={{
            fontSize: '28px',
            fontWeight: '600',
            width: { xs: '350px', md: '400px' },
            height: '120px'
          }}
        >
          <Typewriter
            options={{
              strings: [
                'Borrow Smart, Live Easy: Your Gateway to Modern Finance',
                'Easy Money, Easy Living: Redefine Your Borrowing Experience'
              ],
              autoStart: true,
              loop: true,
              delay: 100
            }}
          />
        </Typography>
        {!isLaptop && (
          <IconButton
            onClick={() => scrollToBottom()}
            sx={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white'
            }}
          >
            <ArrowCircleDownIcon />
          </IconButton>
        )}
      </Grid>
      <Grid
        sx={{
          minHeight: '100vh',
          position: 'relative'
        }}
      >
        {!isLaptop && (
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              position: 'absolute',
              top: '10px',
              left: '0px'
            }}
          >
            <Typography
              sx={{
                fontWeight: '600',
                fontSize: '30px',
                color: 'transparent',
                background: 'linear-gradient(247deg, #4a0071, #9f8fa5)',
                backgroundClip: 'text'
              }}
            >
              LendWise
            </Typography>
            {isLoggedIn && (
              <Button
                onClick={() => dispatch(logout())}
                sx={{
                  width: '150px'
                }}
              >
                Logout
              </Button>
            )}
          </Grid>
        )}
        <Grid
          sx={{
            display: 'flex',
            alignItems: 'center',
            minHeight: '100vh'
          }}
        >
          <Outlet />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Layout;

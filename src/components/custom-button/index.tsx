import React, { ReactNode } from 'react';
import { CircularProgress, Button as MuiButton, SxProps } from '@mui/material';

const Button = ({
  children,
  onClick,
  sx,
  loading = false,
  disabled = false
}: {
  children: ReactNode;
  onClick?: Function;
  sx?: SxProps;
  loading?: boolean;
  disabled?: boolean;
}) => {
  return (
    <MuiButton
      variant='contained'
      sx={{
        background: 'rgba(255, 255, 255, 0.2)',
        width: '100%',
        fontWeight: '600',

        height: '40px',

        '&:hover': {
          background: 'rgba(255, 255, 255, 0.15)'
        },
        '&.Mui-disabled': {
          background: 'rgba(255, 255, 255, 0.2)',
          color: 'white'
        },
        ...sx
      }}
      onClick={() => onClick?.()}
      disabled={loading || disabled}
    >
      {loading ? (
        <CircularProgress
          sx={{
            color: 'white',
            width: '30px !important',
            height: '30px !important'
          }}
        />
      ) : (
        children
      )}
    </MuiButton>
  );
};

export default Button;

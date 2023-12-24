import React, { useEffect, useState } from 'react';
import { Box, Dialog, FormHelperText, Grid, Typography } from '@mui/material';
import Button from '../custom-button';
import { useDispatch, useSelector } from '../../redux/store';
import { clearError } from '../../redux/slice/loan';

const ApprovalConfirmationDialog = ({
  open,
  onClose,
  amount,
  onConfirm
}: {
  open: boolean;
  onClose: Function;
  amount: number;
  onConfirm: Function;
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const { error: apiError } = useSelector(state => state.admin);

  const onApprove = async () => {
    dispatch(clearError());
    setLoading(true);
    await onConfirm();
    setLoading(false);
    onClose();
  };

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);

  return (
    <Dialog
      open={open}
      onClose={() => onClose}
      maxWidth='md'
      PaperProps={{
        sx: {
          background: 'transparent',
          borderRadius: '0px',
          margin: '10px'
        }
      }}
    >
      <Grid
        sx={{
          p: '20px',
          border: '1px solid #ffffff40',
          borderRadius: '10px',
          background: '#000000',
          color: 'white',
          width: { xs: '100%', md: '500px' }
        }}
      >
        <Typography>
          You are about to approve the loan for ${amount}! Do you wish to
          continue?
        </Typography>
        <Box sx={{ mt: '20px' }}>
          {apiError && <FormHelperText error>{apiError}</FormHelperText>}
          <Grid
            sx={{
              display: 'flex',
              gap: '20px',
              flexDirection: { xs: 'column', md: 'row' }
            }}
          >
            <Button disabled={loading} onClick={onClose}>
              Cancel
            </Button>

            <Button onClick={() => onApprove()} loading={loading}>
              Approve
            </Button>
          </Grid>
        </Box>
      </Grid>
    </Dialog>
  );
};

export default ApprovalConfirmationDialog;

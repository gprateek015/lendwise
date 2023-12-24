import {
  Box,
  CircularProgress,
  Dialog,
  FormHelperText,
  Grid,
  Typography
} from '@mui/material';
import React, {
  ChangeEvent,
  EventHandler,
  useEffect,
  useMemo,
  useState
} from 'react';
import { InputField, InputLabel } from './style';
import { Loan } from '../../types';
import Button from '../custom-button';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from '../../redux/store';
import { repayLoan } from '../../actions/loan';
import { clearError } from '../../redux/slice/loan';

const round = (num: number) => Math.round((num * 10) / 10);

const RepaymentDialog = ({
  open,
  onClose,
  loan
}: {
  open: boolean;
  onClose: Function;
  loan: Loan | null;
}) => {
  const [remainingLoan, setRemainingLoan] = useState(0);
  const [nextInstallment, setNextInstallment] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { error: apiError } = useSelector(state => state.loan);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    defaultValues: {
      amount: '' as number | string
    }
  });

  const handleCancel = () => {
    onClose();
    reset();
  };

  const onSubmit = async (data: { amount: number | string }) => {
    dispatch(clearError());
    setLoading(true);
    if (loan?._id)
      await dispatch(repayLoan({ loan_id: loan?._id, amount: data.amount }));
    setLoading(false);
    handleCancel();
  };

  useEffect(() => {
    setRemainingLoan(
      round((loan?.total_amount || 0) - (loan?.paid_amount || 0))
    );
    for (let installm of loan?.installments || []) {
      if (installm?.status === 'paid') continue;
      setNextInstallment(
        round((installm?.minimum_amount || 0) - (installm?.paid_amount || 0))
      );
    }
  }, [loan]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);

  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
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
        <Typography
          sx={{
            fontWeight: '600',
            fontSize: '18px',
            textAlign: 'center',
            mb: '20px'
          }}
        >
          Repayment Center
        </Typography>
        <Grid
          sx={{
            display: 'flex',
            gap: '20px',
            mb: '20px',
            flexDirection: { xs: 'column', md: 'row' }
          }}
        >
          <Button onClick={() => setValue('amount', remainingLoan)}>
            Rem. Loan: ${remainingLoan}
          </Button>
          <Button onClick={() => setValue('amount', nextInstallment)}>
            Next Installm.: ${nextInstallment}
          </Button>
        </Grid>
        <Box>
          <InputLabel>How much whould you like to re-pay?</InputLabel>
          <InputField
            placeholder='Enter the amount'
            type='number'
            {...register('amount', {
              required: 'Amount is required',
              min: {
                value: 1,
                message: 'You must pay alteast $1'
              },
              max: {
                value: remainingLoan,
                message: `Only ${remainingLoan} is left to repay`
              }
            })}
            helperText={errors?.amount?.message}
            error={!!errors?.amount}
          />
        </Box>
        <Box sx={{ mt: '20px' }}>
          {apiError && <FormHelperText error>{apiError}</FormHelperText>}
          <Grid
            sx={{
              display: 'flex',
              gap: '20px',
              mb: '20px',
              flexDirection: { xs: 'column', md: 'row' }
            }}
          >
            <Button loading={loading} onClick={handleCancel}>
              Cancel
            </Button>

            <Button onClick={handleSubmit(onSubmit)} loading={loading}>
              Pay
            </Button>
          </Grid>
        </Box>
      </Grid>
    </Dialog>
  );
};

export default RepaymentDialog;

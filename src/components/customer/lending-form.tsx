import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Grid,
  Typography
} from '@mui/material';
import { Heading, InputField, InputLabel } from './style';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from '../../redux/store';
import { requestNewLoan } from '../../actions/loan';

const LendingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error: apiError } = useSelector(state => state.user);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues
  } = useForm({
    defaultValues: {
      amount: null,
      duration: null
    }
  });

  const onSubmit = async (data: {
    amount?: number | null;
    duration?: number | null;
  }) => {
    setLoading(true);
    if (data.amount !== null && data.duration !== null) {
      await dispatch(
        requestNewLoan({ amount: data.amount, duration: data.duration })
      );
    }
    setLoading(false);
    reset();
    navigate('/consumer/check-existing-loan');
  };

  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}
    >
      <Grid mb='10px'>
        <Heading>Need a loan?</Heading>
        <Heading>No worries! Just fill in the form.</Heading>
      </Grid>
      <Box>
        <InputLabel>Amount (in $)</InputLabel>
        <InputField
          placeholder='Enter the loan amount'
          type='number'
          {...register('amount', {
            required: 'Amount is compulsory',
            min: {
              value: 10,
              message: 'Minimum you can request is $10'
            }
          })}
          helperText={errors?.amount?.message}
          error={!!errors?.amount}
        />
      </Box>
      <Box>
        <InputLabel>Tenure (in Weeks)</InputLabel>
        <InputField
          placeholder='Enter the period for the loan'
          type='number'
          {...register('duration', {
            required: 'Duration is compulsory',
            min: {
              value: 1,
              message: 'Minimum duration must me 1 week'
            }
          })}
          helperText={errors?.duration?.message}
          error={!!errors?.duration}
        />
      </Box>

      <Box marginTop='20px'>
        {apiError && <FormHelperText error>{apiError}</FormHelperText>}
        <Button
          variant='contained'
          sx={{
            background: 'rgba(255, 255, 255, 0.2)',
            width: '100%',
            fontWeight: '600',
            height: '40px',

            '&:hover': {
              background: 'rgba(255, 255, 255, 0.15)'
            }
          }}
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
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
            'Request'
          )}
        </Button>
      </Box>
      <Typography textAlign='center' color='white'>
        Check your existing loans&nbsp;
        <Typography
          component='span'
          sx={{
            textDecoration: 'underline',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/consumer/check-existing-loan')}
        >
          here!
        </Typography>
      </Typography>
    </Grid>
  );
};

export default LendingForm;

import {
  Box,
  CircularProgress,
  FormHelperText,
  Grid,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { InputField, InputLabel } from './style';
import PasswordField from './password-field';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../actions/user';
import { useDispatch, useSelector } from '../../redux/store';
import { clearError } from '../../redux/slice/user';
import Button from '../custom-button';

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error: apiError } = useSelector(state => state.user);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      mobile_no: '',
      password: ''
    }
  });

  const onSubmit = async (data: { mobile_no: string; password: string }) => {
    dispatch(clearError());
    setLoading(true);
    await dispatch(loginUser(data));
    setLoading(false);
  };

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);

  return (
    <>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          position: 'relative'
        }}
      >
        <Box>
          <InputLabel>Mobile Number</InputLabel>
          <InputField
            {...register('mobile_no', {
              required: 'Mobile number is required'
            })}
            placeholder='Type in your Mobile Number'
            helperText={errors?.mobile_no?.message}
            error={!!errors?.mobile_no}
          />
        </Box>
        <Box>
          <InputLabel>Password</InputLabel>
          <PasswordField
            {...register('password', { required: 'Password is required' })}
            placeholder='Type in your password'
            helperText={errors?.password?.message}
            error={!!errors?.password}
          />
        </Box>

        <Box marginTop='20px'>
          {apiError && <FormHelperText error>{apiError}</FormHelperText>}
          <Button onClick={handleSubmit(onSubmit)} loading={loading}>
            Sign in
          </Button>
        </Box>
        <Typography textAlign='center' color='white'>
          Don't have an account?&nbsp;
          <Typography
            component='span'
            sx={{
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/register')}
          >
            Create here!
          </Typography>
        </Typography>
      </Grid>
    </>
  );
};

export default Signin;

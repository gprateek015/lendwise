import React, { useEffect, useState } from 'react';
import { Box, FormHelperText, Grid, Typography } from '@mui/material';
import { InputField, InputLabel } from './style';
import PasswordField from './password-field';
import { useNavigate } from 'react-router-dom';
import { clearError } from '../../redux/slice/user';
import { registerUser } from '../../actions/user';
import { useDispatch, useSelector } from '../../redux/store';
import { useForm } from 'react-hook-form';
import Button from '../custom-button';

const Register = () => {
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
      first_name: '',
      last_name: '',
      mobile_no: '',
      password: ''
    }
  });

  const onSubmit = async (data: {
    mobile_no: string;
    password: string;
    first_name: string;
    last_name: string;
  }) => {
    dispatch(clearError());
    setLoading(true);
    await dispatch(registerUser(data));
    setLoading(false);
  };

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);

  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}
    >
      <Grid
        sx={{
          display: 'flex',
          gap: '20px'
        }}
      >
        <Box>
          <InputLabel>First Name</InputLabel>
          <InputField
            {...register('first_name', { required: "It's required!" })}
            placeholder='Your first name'
            helperText={errors?.first_name?.message}
            error={!!errors?.first_name}
          />
        </Box>
        <Box>
          <InputLabel>Last Name</InputLabel>
          <InputField
            {...register('last_name', { required: "It's required!" })}
            placeholder='Your Last name'
            helperText={errors?.last_name?.message}
            error={!!errors?.last_name}
          />
        </Box>
      </Grid>
      <Box>
        <InputLabel>Mobile Number</InputLabel>
        <InputField
          {...register('mobile_no', { required: 'Mobile is required!' })}
          placeholder='Type in your Mobile Number'
          helperText={errors?.mobile_no?.message}
          error={!!errors?.mobile_no}
        />
      </Box>
      <Box>
        <InputLabel>Password</InputLabel>
        <PasswordField
          {...register('password', { required: 'Password is required!' })}
          placeholder='Type in your password'
          helperText={errors?.password?.message}
          error={!!errors?.password}
        />
      </Box>

      <Box marginTop='20px'>
        {apiError && <FormHelperText error>{apiError}</FormHelperText>}
        <Button onClick={handleSubmit(onSubmit)} loading={loading}>
          Register
        </Button>
      </Box>
      <Typography textAlign='center' color='white'>
        Already have an account?&nbsp;
        <Typography
          component='span'
          sx={{
            textDecoration: 'underline',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
        >
          Sign in!
        </Typography>
      </Typography>
    </Grid>
  );
};

export default Register;

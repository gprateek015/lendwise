import { TextField, Typography, styled } from '@mui/material';

export const InputField = styled(TextField)({
  background: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '5px',
  width: '100%',
  '& input': {
    color: 'white',
    padding: '10px 10px'
  },
  '& fieldset': {
    border: 'none'
  }
});

export const InputLabel = styled(Typography)({
  marginBottom: '2px',
  color: 'white'
});

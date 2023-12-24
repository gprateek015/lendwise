import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '.';

export const requestNewLoan = createAsyncThunk(
  'request-new-loan',
  async (data: { amount?: number; duration?: number }) => {
    const response = await Axios.post('/loan', data);
    return response.data;
  }
);

export const fetchAllLoans = createAsyncThunk('fetch-all-loans', async () => {
  const response = await Axios.get('/loan');
  return response.data;
});

export const repayLoan = createAsyncThunk(
  'repay-loan',
  async (
    { loan_id, amount }: { loan_id: string; amount: number | string },
    { dispatch }
  ) => {
    const response = await Axios.post(`/loan/${loan_id}/repay`, {
      amount: typeof amount === 'number' ? amount : parseFloat(amount)
    });
    await dispatch(fetchAllLoans());
    return response.data;
  }
);

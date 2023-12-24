import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '.';

export const fetchUnpaidInstallments = createAsyncThunk(
  'fetch-installments',
  async () => {
    const response = await Axios.get('/installment');
    return response.data;
  }
);

export const repayInstallment = createAsyncThunk(
  'repay-installment',
  async (
    {
      installment_id,
      amount
    }: {
      installment_id: string;
      amount: number;
    },
    { dispatch }
  ) => {
    const response = await Axios.post(`/installment/${installment_id}/repay`, {
      amount
    });
    await dispatch(fetchUnpaidInstallments());
    return response.data;
  }
);

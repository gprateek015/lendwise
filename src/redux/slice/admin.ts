import { createSlice } from '@reduxjs/toolkit';
import { Installment, Loan } from '../../types';
import { fetchAllLoans, repayLoan, requestNewLoan } from '../../actions/loan';
import {
  fetchUnpaidInstallments,
  repayInstallment
} from '../../actions/installment';
import { fetchLoans } from '../../actions/admin';

type InitialStateType = {
  loans: Loan[];
  error?: string;
};

const initialState: InitialStateType = {
  loans: [],
  error: ''
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearError: state => {
      state.error = '';
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchLoans.fulfilled, (state, action) => {
      state.loans = action.payload.loans;
    });
  }
});

export const { clearError } = adminSlice.actions;

export default adminSlice.reducer;

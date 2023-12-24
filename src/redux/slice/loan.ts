import { createSlice } from '@reduxjs/toolkit';
import { Installment, Loan } from '../../types';
import { fetchAllLoans, repayLoan, requestNewLoan } from '../../actions/loan';
import {
  fetchUnpaidInstallments,
  repayInstallment
} from '../../actions/installment';

type InitialStateType = {
  paid_loans: Loan[];
  approved_loans: Loan[];
  pending_loans: Loan[];
  pending_installments: Installment[];
  error?: string;
};

const initialState: InitialStateType = {
  paid_loans: [],
  approved_loans: [],
  pending_loans: [],
  pending_installments: [],
  error: ''
};

const loanSlice = createSlice({
  name: 'loan',
  initialState,
  reducers: {
    clearError: state => {
      state.error = '';
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllLoans.fulfilled, (state, action) => {
        state.pending_loans = action.payload.loans.filter(
          (loan: Loan) => loan.approval_status === 'pending'
        );
        state.approved_loans = action.payload.loans.filter(
          (loan: Loan) =>
            loan.approval_status === 'approved' && loan.status === 'pending'
        );
        state.paid_loans = action.payload.loans.filter(
          (loan: Loan) => loan.status === 'paid'
        );
      })
      .addCase(fetchUnpaidInstallments.fulfilled, (state, action) => {
        state.pending_installments = action.payload.installments;
      })
      .addCase(fetchAllLoans.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(requestNewLoan.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(repayLoan.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(repayInstallment.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export const { clearError } = loanSlice.actions;

export default loanSlice.reducer;

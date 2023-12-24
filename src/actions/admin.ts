import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '.';

let fetchLoanAbortController: AbortController | null = null;
export const fetchLoans = createAsyncThunk(
  'fetch-loans',
  async ({
    min_amount,
    max_amount,
    approval_status
  }: {
    min_amount?: number;
    max_amount?: number;
    approval_status?: '' | 'approved' | 'pending';
  }) => {
    if (fetchLoanAbortController) fetchLoanAbortController.abort();

    fetchLoanAbortController = new AbortController();

    const response = await Axios.get('/admin/loan', {
      signal: fetchLoanAbortController.signal,
      params: { min_amount, max_amount, approval_status }
    });
    return response.data;
  }
);

export const approveLoan = createAsyncThunk(
  'approve-loan',
  async ({ loan_id }: { loan_id: string }) => {
    const response = await Axios.post('/admin/loan/approve', { loan_id });
    return response.data;
  }
);

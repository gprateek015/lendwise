import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../redux/store';
import { fetchAllLoans } from '../../actions/loan';
import { Switch } from './style';

import InstallmentTable from './installment-table';
import LoanBox from '../loan-box';
import { fetchUnpaidInstallments } from '../../actions/installment';

const ExistingLoans = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    pending_loans = [],
    approved_loans = [],
    paid_loans = [],
    pending_installments = []
  } = useSelector(state => state.loan);

  const [expandedLoan, setExpandedLoan] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (page === 0) await dispatch(fetchAllLoans());
      else await dispatch(fetchUnpaidInstallments());
      setLoading(false);
    })();
  }, [page]);

  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: '15px'
      }}
    >
      <Grid
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          alignItems: 'center'
        }}
      >
        <Typography
          flexBasis='45%'
          fontSize='14px'
          textAlign='right'
          fontWeight={page === 0 ? '600' : '500'}
        >
          Loans
        </Typography>
        <Switch
          checked={page === 1}
          onChange={() => setPage(curr => curr ^ 1)}
        />
        <Typography
          flexBasis='53%'
          fontSize='14px'
          fontWeight={page === 1 ? '600' : '500'}
        >
          Pending Installments
        </Typography>
      </Grid>

      <Grid flexGrow={1} overflow={'auto'}>
        {loading && (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CircularProgress sx={{ color: 'white' }} />
          </Box>
        )}
        <>
          {page === 0 ? (
            <>
              {approved_loans?.length !== 0 && (
                <LoanBox
                  loans={approved_loans}
                  expandedLoan={expandedLoan}
                  setExpandedLoan={setExpandedLoan}
                  title={'Approved Loans'}
                  approved={true}
                />
              )}
              {pending_loans?.length !== 0 && (
                <LoanBox
                  loans={pending_loans}
                  expandedLoan={expandedLoan}
                  setExpandedLoan={setExpandedLoan}
                  title={'Pending Loans'}
                />
              )}
              {paid_loans?.length !== 0 && (
                <LoanBox
                  loans={paid_loans}
                  expandedLoan={expandedLoan}
                  setExpandedLoan={setExpandedLoan}
                  title={'Paid Loans'}
                />
              )}
              {approved_loans?.length === 0 &&
                pending_loans?.length === 0 &&
                paid_loans?.length === 0 && (
                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography>You haven't applied for a loan yet</Typography>
                  </Box>
                )}
            </>
          ) : (
            <InstallmentTable
              installments={pending_installments}
              allowDirectPay={true}
            />
          )}
        </>
      </Grid>
      <Typography textAlign='center' color='white'>
        Need a new loan?&nbsp;
        <Typography
          component='span'
          sx={{
            textDecoration: 'underline',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/consumer/new-loan')}
        >
          Click here!
        </Typography>
      </Typography>
    </Grid>
  );
};

export default ExistingLoans;

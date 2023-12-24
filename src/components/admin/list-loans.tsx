import { Box, CircularProgress, Grid, Slider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from '../../redux/store';
import { approveLoan, fetchLoans } from '../../actions/admin';
import LoanBox from '../loan-box';
import { selectStyles } from './style';

const ListLoans = () => {
  const dispatch = useDispatch();
  const { loans } = useSelector(state => state.admin);
  const [expandedLoan, setExpendedLoan] = useState<string | null>(null);
  const [approvalStatus, setApprovalStatus] = useState<
    'approved' | 'pending' | ''
  >('');
  const [range, setRange] = React.useState<number[]>([0, 45]);
  const [loading, setLoading] = useState(false);

  const minDistance = 5;

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setRange([Math.min(newValue[0], range[1] - minDistance), range[1]]);
    } else {
      setRange([range[0], Math.max(newValue[1], range[0] + minDistance)]);
    }
  };

  const fetchLoansHandler = async () => {
    setLoading(true);
    await dispatch(
      fetchLoans({
        min_amount: range[0] * 1e3,
        max_amount: range[1] * 1e3,
        approval_status: approvalStatus
      })
    );
    setLoading(false);
  };

  const onApproveLoan = async (loan_id: string) => {
    await dispatch(approveLoan({ loan_id }));
    await fetchLoansHandler();
  };

  useEffect(() => {
    fetchLoansHandler();
  }, [range, approvalStatus]);

  const options = [
    {
      label: 'All',
      value: ''
    },
    {
      label: 'Approved',
      value: 'approved'
    },
    {
      label: 'Pending',
      value: 'Pending'
    }
  ];

  return (
    <Grid
      sx={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      <Grid
        sx={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: { xs: 'column', md: 'row' }
        }}
      >
        <Grid p='0px 10px' flexBasis={'50%'} width={'100%'}>
          <Typography>Approval Status</Typography>
          <Select
            options={options}
            styles={selectStyles}
            value={options.find(opt => opt.value === approvalStatus)}
            onChange={val => setApprovalStatus(val.value)}
          />
        </Grid>
        <Grid p='0px 10px' flexBasis={'50%'} width={'100%'}>
          <Typography>Loan Amount Range</Typography>
          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={range}
            onChange={handleChange}
            valueLabelDisplay='auto'
            step={5}
            valueLabelFormat={num => (num === 0 ? num : `$${num}k`)}
            sx={{ color: 'white' }}
          />
        </Grid>
      </Grid>
      <Grid flexGrow={1} overflow={'auto'}>
        {loading ? (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CircularProgress sx={{ color: 'white' }} />
          </Box>
        ) : (
          <LoanBox
            loans={loans}
            expandedLoan={expandedLoan}
            setExpandedLoan={setExpendedLoan}
            title={'Loans'}
            admin={true}
            onApproveLoan={onApproveLoan}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default ListLoans;

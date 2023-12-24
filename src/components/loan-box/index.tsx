import React, { useState } from 'react';
import {
  Box,
  Grid,
  IconButton,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Loan } from '../../types';
import InstallmentTable from '../customer/installment-table';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import RepaymentDialog from '../customer/repayment-dialog';
import AddTaskIcon from '@mui/icons-material/AddTask';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import ApprovalConfirmationDialog from '../admin/approval-confirmation';
import { useDispatch } from '../../redux/store';

const LoanBox = ({
  loans,
  expandedLoan,
  setExpandedLoan,
  title,
  approved = false,
  admin = false,
  onApproveLoan
}: {
  loans: Loan[];
  expandedLoan: string | null;
  setExpandedLoan: Function;
  title: string;
  approved?: boolean;
  admin?: boolean;
  onApproveLoan?: Function;
}) => {
  const dispatch = useDispatch();
  const isLaptop = useMediaQuery('(min-width:900px)');
  const collapse = () => setExpandedLoan(null);

  // For consumer (admin === false)
  const [repaymentLoan, setRepaymentLoan] = useState<Loan | null>(null);

  // For admin (admin === true)
  const [approveLoanData, setApproveLoanData] = useState<Loan | null>(null);
  const onConfirm = async () => {
    onApproveLoan?.(approveLoanData?._id as string);
  };

  return (
    <>
      <RepaymentDialog
        open={repaymentLoan !== null}
        onClose={() => setRepaymentLoan(null)}
        loan={repaymentLoan}
      />
      <ApprovalConfirmationDialog
        open={approveLoanData !== null}
        onClose={() => setApproveLoanData(null)}
        amount={approveLoanData?.total_amount as number}
        onConfirm={onConfirm}
      />
      <Grid>
        <Typography fontWeight='600' mb='10px'>
          {title}
        </Typography>
        {loans.map((loan: Loan) => (
          <Grid
            sx={{
              border: '1px solid #ffffff20',
              borderRadius: '10px',
              padding: '10px',
              mb: '10px'
            }}
          >
            <Grid
              sx={{
                display: 'flex',
                gap: '20px'
              }}
            >
              <Typography>
                Loan:&nbsp;$
                <Typography component='span'>{loan.total_amount}</Typography>
              </Typography>
              <Typography>
                {isLaptop ? 'Installments' : 'Installm.'}:&nbsp;
                <Typography component='span'>
                  {loan.installments?.length || 0}
                </Typography>
              </Typography>
              <Box
                sx={{
                  flexGrow: '1',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '10px'
                }}
              >
                {approved && (
                  <IconButton
                    sx={{ padding: 0 }}
                    onClick={() => setRepaymentLoan(loan)}
                  >
                    <CurrencyExchangeIcon sx={{ color: 'white' }} />
                  </IconButton>
                )}
                {admin &&
                  (loan.approval_status === 'pending' ? (
                    <IconButton
                      sx={{ padding: 0 }}
                      onClick={() => setApproveLoanData(loan)}
                    >
                      <AddTaskIcon sx={{ color: 'white' }} />
                    </IconButton>
                  ) : (
                    <IconButton sx={{ padding: 0 }}>
                      <BeenhereIcon sx={{ color: 'white' }} />
                    </IconButton>
                  ))}
                <IconButton
                  sx={{ padding: 0 }}
                  onClick={() =>
                    expandedLoan === loan._id
                      ? collapse()
                      : setExpandedLoan(loan._id)
                  }
                >
                  {expandedLoan === loan._id ? (
                    <ExpandLessIcon sx={{ color: 'white' }} />
                  ) : (
                    <ExpandMoreIcon sx={{ color: 'white' }} />
                  )}
                </IconButton>
              </Box>
            </Grid>
            {expandedLoan === loan._id && (
              <InstallmentTable
                installments={loan.installments || []}
                allowDirectPay={approved}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default LoanBox;

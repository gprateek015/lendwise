import {
  Box,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { Installment } from '../../types';
import { TableCell } from './style';
import ConfirmationDialog from './confirmation-dialog';
import { useDispatch } from '../../redux/store';
import { repayInstallment } from '../../actions/installment';

const round = (num: number = 0) => Math.round(num * 10) / 10;

const InstallmentTable = ({
  installments = [],
  allowDirectPay = false
}: {
  installments: Installment[];
  allowDirectPay?: boolean;
}) => {
  const dispatch = useDispatch();
  const [installmentRepay, setInstallmentRepay] = useState<Installment | null>(
    null
  );
  const onPayInstallment = async () => {
    if (installmentRepay !== null)
      await dispatch(
        repayInstallment({
          installment_id: installmentRepay?._id as string,
          amount:
            (installmentRepay?.minimum_amount || 0) -
            (installmentRepay?.paid_amount || 0)
        })
      );
  };

  return (
    <>
      {installments?.length === 0 && (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography textAlign={'center'}>
            Congratulations!! You have no pending repayments.
          </Typography>
        </Box>
      )}
      <ConfirmationDialog
        open={installmentRepay !== null}
        onClose={() => setInstallmentRepay(null)}
        amount={
          (installmentRepay?.minimum_amount || 0) -
          (installmentRepay?.paid_amount || 0)
        }
        onConfirm={onPayInstallment}
      />
      {installments?.length !== 0 && (
        <TableContainer component={Grid}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sch. Date</TableCell>
                <TableCell align='center'>Paid/Rem. amt</TableCell>
                <TableCell align='right'>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {installments.map(installment => (
                <TableRow
                  key={installment._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    {new Date(installment?.scheduled_date || '').toDateString()}
                  </TableCell>
                  <TableCell align='center'>
                    {round(installment.paid_amount)}&nbsp;/&nbsp;
                    {round(installment.minimum_amount) -
                      round(installment.paid_amount)}
                  </TableCell>
                  <TableCell
                    align='right'
                    onClick={() =>
                      allowDirectPay &&
                      installment.status === 'pending' &&
                      setInstallmentRepay(installment)
                    }
                    sx={{
                      textDecoration:
                        allowDirectPay && installment.status === 'pending'
                          ? 'underline'
                          : 'none',
                      cursor:
                        allowDirectPay && installment.status === 'pending'
                          ? 'pointer'
                          : 'default'
                    }}
                  >
                    {installment.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default InstallmentTable;

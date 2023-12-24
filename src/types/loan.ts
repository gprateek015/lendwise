import Installment from './installment';
import User from './user';

type Loan = {
  total_amount?: number;
  paid_amount?: number;
  duration?: number;
  approval_status?: 'approved' | 'pending';
  status?: 'paid' | 'pending';
  date?: string;
  user?: User;
  installments?: Installment[];
  _id?: string;
};

export default Loan;

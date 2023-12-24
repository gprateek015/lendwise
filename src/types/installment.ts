import Loan from './loan';
import User from './user';

type Installment = {
  paid_amount?: number;
  minimum_amount?: number;
  status?: 'pending' | 'paid';
  scheduled_date?: string;
  paid_date?: string;
  loan?: Loan;
  user?: User;
  _id?: string;
};

export default Installment;

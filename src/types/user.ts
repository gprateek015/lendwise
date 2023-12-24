import Installment from './installment';
import Loan from './loan';

type User = {
  first_name?: string;
  last_name?: string;
  mobile_no?: string;
  password?: string;
  loan?: Loan[];
  repayments?: Installment[];
  _id?: string;
};

export default User;

import userSlice from './user';
import loanSlice from './loan';
import adminSlice from './admin';

const reducers = {
  user: userSlice,
  loan: loanSlice,
  admin: adminSlice
};

export default reducers;

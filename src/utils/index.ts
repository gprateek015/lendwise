import { fetchSelf } from '../actions/user';
import { AUTH_TOKEN } from '../constants';
import { addToken } from '../redux/slice/user';
import { AppDispatch } from '../redux/store';

export const scrollToBottom = () => {
  const height = window.innerHeight;
  window.scrollTo({
    top: height,
    behavior: 'smooth'
  });
};

export const autoLogin = () => {
  return (dispatch: AppDispatch) => {
    const auth_token = localStorage.getItem(AUTH_TOKEN);

    if (auth_token) {
      dispatch(addToken(auth_token));
      dispatch(fetchSelf());
    }
  };
};

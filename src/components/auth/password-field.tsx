import React, { ChangeEvent, EventHandler, useState } from 'react';
import { InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputField } from './style';

type InputProps = {
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: EventHandler<ChangeEvent>;
  helperText?: string;
  error?: boolean;
};

const PasswordField = React.forwardRef(
  (props: InputProps, ref: React.Ref<any>) => {
    const [show, toggleShow] = useState<boolean>(false);
    return (
      <InputField
        {...props}
        type={show ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position='end'
              onClick={() => toggleShow(curr => !curr)}
              sx={{
                color: 'white',
                cursor: 'pointer'
              }}
            >
              {show ? <Visibility /> : <VisibilityOff />}
            </InputAdornment>
          )
        }}
        ref={ref}
      />
    );
  }
);

export default PasswordField;

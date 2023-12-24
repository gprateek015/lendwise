import { StylesConfig } from 'react-select';

export const selectStyles: StylesConfig<any> = {
  control: (style: any) => ({
    ...style,
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '5px',
    color: 'white',
    ':active': {
      ...style[':active'],
      borderColor: 'rgba(255, 255, 255, 0.3)'
    },
    ':focus': {
      ...style[':active'],
      borderColor: 'rgba(255, 255, 255, 0.3)'
    },
    ':hover': {
      ...style[':active'],
      borderColor: 'rgba(255, 255, 255, 0.3)'
    }
  }),
  menu: (style: any) => ({
    ...style,
    background: 'rgba(0,0,0)',
    backDrop: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    borderRadius: '5px'
  }),
  input: (style: any) => ({
    ...style,
    color: 'white'
  }),
  singleValue: (style: any) => ({
    ...style,
    color: 'white'
  }),
  option: (style: any, { isFocused }) => ({
    ...style,
    background: isFocused ? '#ffffff20' : 'black',
    cursor: 'pointer',
    ':active': {
      ...style[':active'],
      backgroundColor: '#ffffff50'
    }
  })
};

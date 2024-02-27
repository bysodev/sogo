const textFieldStyles = {
  '& .MuiInputBase-root': {
    width: '100%',
  },
  '& .MuiFormHelperText-root': {
    width: '100%',
    p: 0.5,
  },
  '& .MuiInputLabel-root': {
    fontSize: '.9rem',
  },
  '& .MuiInputLabel-root[data-shrink=false]': {
    transform: 'translate(1.25rem, 0.75rem) scale(1)',
  },
  '& .MuiInputBase-input': {
    p: '0.75rem 0.75rem 0.75rem 1.25rem',
    boxShadow:
      '0  0 #000, 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
  },
};

export default textFieldStyles;

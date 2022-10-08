import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

const DatePicker = ({
  name,
  ...otherProps
}) => {
  const [field, meta] = useField(name);

  const configDatePicker = {
    ...field,
    ...otherProps,
    type: 'date',
    variant: 'outlined',
    InputLabelProps: {
      shrink: true
    }
  };

  if(meta && meta.touched && meta.error) {
    configDatePicker.error = true;
    configDatePicker.helperText = meta.error;
  }

  return (
    <TextField
      {...configDatePicker}
      sx={{
        svg: {color: "#fcfcfc"}
      }}
    />
  );
};

export default DatePicker;
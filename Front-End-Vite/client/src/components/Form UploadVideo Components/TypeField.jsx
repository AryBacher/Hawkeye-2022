import React from 'react';
import {TextField, MenuItem} from '@mui/material';
import {useField, useFormikContext} from 'formik';

function TypeField({
  name,
  ...otherProps
}){

  const {setFieldValue} = useFormikContext();
  const [field, meta] = useField(name)

  const handleChange = e =>{
    const {value} = e.target;
    setFieldValue(name, value);
  }

  const configSelect = {
    ...field,
    ...otherProps,
    select : true,
    variant : 'outlined',
    onChange: handleChange
  }
  
  /*
  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  };
  */

  return (
    <TextField {...configSelect}>
      <MenuItem value="match">
        Partido
      </MenuItem>
      <MenuItem value="training">
        Entrenamiento
      </MenuItem>
    </TextField>
  )
}

export default TypeField
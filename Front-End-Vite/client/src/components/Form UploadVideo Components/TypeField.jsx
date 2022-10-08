import React from 'react';
import {TextField, MenuItem} from '@mui/material';
import {useField, useFormikContext} from 'formik';

function TypeField({
  name,
  options,
  ...otherProps
}) {

  const handleChange = e =>{

  }

  const configSelect = {
    select : true,
    variant : 'outlined',
    onChange : handleChange
  }
  return (
    <TextField {...configSelect}/>
  )
}

export default TypeField
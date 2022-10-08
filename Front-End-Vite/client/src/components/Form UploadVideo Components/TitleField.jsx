import React from 'react'
import {TextField} from '@mui/material';
import {useField} from 'formik';

function TitleField({
  name,
  ...otherProps
}) {

  const [field, mata] = useField(name);

  const configTitleField = {
    ...field,
    ...otherProps,
    variant: 'outlined'
  }

  if (mata && mata.touched && mata.error){
    configTitleField.error = true;
    configTitleField.helperText = mata.error;
  }

  return (
    <>
      <TextField {...configTitleField}/>
    </>
  )
}

export default TitleField;
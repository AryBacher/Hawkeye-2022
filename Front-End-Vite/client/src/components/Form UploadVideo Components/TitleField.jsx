import React from 'react'
import {TextField} from '@mui/material';
import {useField} from 'formik';

function TitleField({
  name,
  ...otherProps
}) {

  const [field, meta] = useField(name);

  const configTitleField = {
    ...field,
    ...otherProps,
    variant: 'outlined'
  }

  if (meta && meta.touched && meta.error){
    configTitleField.error = true;
    configTitleField.helperText = meta.error;
  }

  return (
    <>
      <TextField {...configTitleField}/>
    </>
  )
}

export default TitleField;
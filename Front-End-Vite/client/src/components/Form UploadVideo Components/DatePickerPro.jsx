import React from 'react';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {es} from 'date-fns/locale'
import { useField } from 'formik';

function DatePickerPro(
    name,
    ...otherProps
) {
    
  const [field, meta] = useField(name);

  const configDatePicker = {
    ...field,
    ...otherProps,
  };

  if(meta && meta.touched && meta.error) {
    configDatePicker.error = true;
    configDatePicker.helperText = meta.error;
  }

  const [value, setValue] = useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <>
        <LocalizationProvider adapterLocale={es} dateAdapter={AdapterDateFns}>
            <MobileDatePicker
                {...configDatePicker}
                label="Fecha del entrenamiento/partido"
                inputFormat="dd/mm/yyyy"
                value={value}
                onChange={handleChange}
                renderInput={(configFieldRendered) => <TextField {...configFieldRendered} />}
            />
        </LocalizationProvider>
    </>
  )
}

export default DatePickerPro
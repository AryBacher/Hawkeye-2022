import React from 'react'
import { Button } from '@mui/material'
import { useFormikContext } from 'formik'

function BtnSubmit({
  children,
  ...otherProps
}) {

  const { submitForm } = useFormikContext(); 

  const handleSubmit = ()=>{
    submitForm();
  }

  const configBtnSubmit = {
    variant: 'contained',
    color: 'primary',
    onClick: handleSubmit
  }
  return (
    <>
      <Button
        {...configBtnSubmit}
      >
        {children}
      </Button>
    </>
  )
}

export default BtnSubmit
import React from 'react'
import { useState } from 'react';
import { Alert, Collapse } from '@mui/material';

export function useAlert() {

  const [isVisible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");

  const showMessage = () => setVisible(true);
  const hideMessage = () => setVisible(false);

  const getProps = ({ variant, message }) => {
    console.log(variant, message);
    setVariant(variant);
    setMessage(message);
    showMessage();
  };

  return (
    <>
      <Collapse in={isVisible ? true : false}>
        <Alert  onClose={hideMessage} severity={variant}>
          {message}
        </Alert>
      </Collapse>
    </>
  )

  return [AlertMessage, isVisible, getProps];
}
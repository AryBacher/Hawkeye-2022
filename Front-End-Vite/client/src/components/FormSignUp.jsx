import React from "react";
import { TextField, Button } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { object, string, ref } from "yup";
import "../stylesheets/FormSignUpStylesheets/Form.css";

function FormSignUp() {
  const initialValues={
    "email" : "",
    "password" : "",
    "passwordConfirm" : "",
  }
  return (
    <>
      <Formik initialValues={initialValues} onSubmit={(values, formikHelpers)=>{
        console.log(values);
        formikHelpers.resetForm();
      }}
      
      validationSchema= {object({

        email : string().required("Ingrese su email").email("Email inválido"),
        password : string().required("Ingrese su contraseña").min(8, "La contraseña debe ser de mínimo 8 caracateres"),
        passwordConfirm : string().required("Ingrese su contraseña").oneOf([ref("password")], "Las contraseñas no coinciden"),

      })}
      
      >
        {({errors, isValid, touched, dirty})=>(
          <Form>
            <Field 
              name="email" 
              type="email" 
              as={TextField} 
              variant="outlined" 
              color="primary" 
              label="Email" 
              size="normal" 
              error = {Boolean(errors.email) && Boolean(touched.email)}
              helperText = {Boolean(touched.email) && errors.email} 
            />

            <Field 
              name="password" 
              type="password" 
              as={TextField} 
              variant="outlined" 
              color="primary" 
              label="Contraseña" 
              size="normal" 
              error = {Boolean(errors.password) && Boolean(touched.password)}
              helperText = {Boolean(touched.password) && errors.password}  
            />

            <Field 
              name="passwordConfirm" 
              type="password" 
              as={TextField} 
              variant="outlined" 
              color="primary" 
              label="Confirmar contraseña" 
              size="normal" 
              error = {Boolean(errors.passwordConfirm) && Boolean(touched.passwordConfirm)}
              helperText = {Boolean(touched.passwordConfirm) && errors.passwordConfirm}  
            />
            
            <Button 
              variant="contained"
              type="submit" 
              size="large"
              disabled= {!dirty || !isValid}>
              Continuar
            </Button>

          </Form>
        )
        }
      </Formik>
    
    </>
  );
}

export default FormSignUp;

import { Field, useFormikContext,  } from "formik";
import TypeField from "./Form UploadVideo Components/TypeField";

function InStep(activeStep){

    const formik = useFormikContext()

    switch(activeStep){
      
      case 0 : return (
        <>
          <Field
            name="title"
            type="name"
            as={TextField}
            variant="outlined"
            color="primary"
            label="Título"
            size="normal"
          />
          <TypeField name="type" label="Tipo de análisis" />
          <Field
            name="rival"
            type="name"
            as={TextField}
            variant="outlined"
            color="primary"
            label="Rival (opcional)"
            size="normal"
          />
          <Field
            name="date"
            type="date"
            as={TextField}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            color="primary"
            label="Fecha del evento"
            size="normal"
          />
        </>
      );
      case 1: return (
        <>
          <Field
            name="corners"
            type="text"
            as={TextField}
            variant="outlined"
            color="primary"
            label="Esquinas de la cancha"
            size="normal"
          />
        </>
      );
      case 2: return (
        <>
          <input
            name="file"
            type="file"
            accept="video/*"
            onChange={(event) => {
              formik.setFieldValue("file", event.currentTarget.files[0]);
            }}
          />
        </>
      );
  }}

  export default InStep;
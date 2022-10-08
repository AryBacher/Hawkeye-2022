import React from 'react'
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import {useField, useFormikContext} from 'formik';

// Este array de objetos te lo dejo (Alan) para que entiendas como funca el mambo.

const rivalUsers = [
    {id: "1", rivalName: "Arotu"},
    {id: "2", rivalName: "Ary Bacher"},
    {id: "3", rivalName: "Alan Yeger"},
    {id: "4", rivalName: "Guido Zyl"},
]

const filter = createFilterOptions();

function RivalFieldPro(
  name,
  ...otherProps
) {

  const {setFieldValue} = useFormikContext();
  const [field, meta] = useField()

  const [value, setValue] = useState(null);
    
  return (
    <>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setValue({
              rivalName: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // Crear un nuevo valor a partir del input del usuario.
            setValue({
              rivalName: newValue.inputValue,
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Sugerimos la creación de un nuevo valor inexistente.
          const isExisting = options.some((option) => inputValue === option.title);
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              title: `Agregar "${inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={rivalUsers}
        getOptionLabel={(option) => {
          // Valor seleccionado con enter, directamente desde la entrada.
          if (typeof option === 'string') {
            return option;
          }
          // Agregar "xxx" opción creada dinámicamente
          if (option.inputValue) {
            return option.inputValue;
          }
          // Opcion regular
          return option.rivalName;
        }}
        renderOption={(props, option) => <li {...props}>{option.rivalName}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Rival" />
        )}
      />
    </>
  )
}

export default RivalFieldPro
import React from "react";
import { Alert } from "@mui/material";

function AlertWarning() {
  return (
    <Alert severity="warning" variant="outlined">
      En el siguiente campo hay que marcar las esquinas utilizando los vértices.
      Esto facilitará el análisis del video. Para guardar la posición haga click sobre el botón homónimo.
    </Alert>
  );
}

export default AlertWarning;

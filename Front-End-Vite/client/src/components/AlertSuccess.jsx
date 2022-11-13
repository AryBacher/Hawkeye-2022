import React from "react";
import { useState } from "react";
import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function AlertSuccess({text, variant, sxCollapse, sxAlert}) {
  const [open, setOpen] = useState(true);

  //Su análisis ha sido subido en la sección de Análisis! --> {text}
  // bottom : 5vh
  // right: 3vw

  return (
    <>
      <Collapse
        in={open}
        sx={{
          position: "fixed",
          bottom: "5vh",
          right: "3vw",
          transition: "all 250ms ease-out",
        }}
      >
        <Alert
          variant={variant}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ backgroundColor: "#151f27", fontSize: "16px", fontWeight: 300 }}
        >
          {text}
        </Alert>
      </Collapse>
    </>
  );
}

export default AlertSuccess;

import React from "react";
import { useState } from "react";
import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function AlertFail({text}) {

  const [open, setOpen] = useState(true);

  //Mail y/o contraseña inválidos --> {text}


  return (
    <>
      <Collapse
        in={open}
        sx={{
          position: "fixed",
          transition: "all 250ms ease-out",
        }}
      >
        <Alert
          variant="outlined"
          severity="error"
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

export default AlertFail;

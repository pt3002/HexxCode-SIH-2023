import * as React from "react";
import Button from "@mui/material/Button";
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';


export default function NotifyEducators() {
  return (
    <>
        <div>NotifyEducators</div>
        <Button variant="contained"
                      sx={{ margin: 1 }}
                      size="large" startIcon={<AddCircleSharpIcon />}>
        New Notification for Curriculum Developers
      </Button>
    </>
  )
}

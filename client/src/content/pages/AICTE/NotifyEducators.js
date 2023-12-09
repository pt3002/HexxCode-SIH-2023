import * as React from "react";
import Button from "@mui/material/Button";
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';

const notifications = [
  {
    notification_num : 1,
    notification_msg : "initial"
  },
  {
    notification_num : 1,
    notification_msg : "initial"
  },
  {
    notification_num : 1,
    notification_msg : "initial"
  }
  ];

export default function NotifyEducators() {
  return (
    <>
        <div>NotifyEducators</div>
        <Button variant="contained"
                      sx={{ margin: 1 }}
                      size="large" startIcon={<AddCircleSharpIcon />}>
        New Notification for Educators
      </Button>
      {notifications.map((ele, idx) => (
        <div key={ele.id}>
          {ele.notification_msg}
        </div>
      ))}
    </>
  )
}

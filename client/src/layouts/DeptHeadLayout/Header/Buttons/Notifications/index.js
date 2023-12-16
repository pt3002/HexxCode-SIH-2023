import {
  Card,
  alpha,
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  Grid,
  ListItem,
  Popover,
  Tooltip,
  Typography,
  styled,
  ListItemText,
  ListSubheader,
  ListItemButton,
  Button,
} from '@mui/material';
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import DeleteIcon from "@mui/icons-material/Delete";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import { fToNow } from '../../../../../utils/formatTime'
import React, { useRef, useState } from 'react';
import axios from 'axios'
import { backendURL } from '../../../../../configKeys';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import Scrollbar from "../../../../../components/Scrollbar"
import { formatDistance, subDays } from 'date-fns';
import Slide from "@mui/material/Slide";
import DocViewer from "../../../../../content/pages/Components/DocViewer";

const NotificationsBadge = styled(Badge)(
  ({ theme }) => `
    
    .MuiBadge-badge {
        background-color: ${alpha(theme.palette.error.main, 0.1)};
        color: ${theme.palette.error.main};
        min-width: 16px; 
        height: 16px;
        padding: 0;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
            content: "";
        }
    }
`
);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// function NotificationList({ notifications, onNotificationClick, onDeleteNotification }) {
//   return (
//     <List disablePadding>
//       {notifications.map((notification) => (
//         <NotificationItem
//           key={notification.id}
//           notification={notification}
//           onNotificationClick={onNotificationClick}
//           onDeleteNotification={() => onDeleteNotification(notification.video_id)}
//         />
//       ))}
//     </List>
//   );
// }
const StyledCard = styled(Card)(
  ({ theme, isNew }) => `
    margin-bottom: ${theme.spacing(2)};
    background-color: ${isNew ? theme.palette.background.paper : theme.palette.background.default};
    ${isNew ? '' : 'border: 1px solid ' + alpha(theme.palette.divider, 0.5)};
  `
);

const NotificationItem = ({ notification, onNotificationClick, onDeleteNotification }) => {
  const isNew = notification.isUnread === 1;

  return (
    <StyledCard isNew={isNew} elevation={isNew ? 3 : 1}>
      <Box padding={1} display="flex" alignItems="center" justify-content= "space-between">
         {/* Add your notification content here */}
        <Typography variant="subtitle1" align-self ="flex-end" >{notification.title}</Typography>
        <Button sx={{marginLeft:"5%"}}>
          <DocViewer
            filename={notification.description}
            contentType="application/pdf"
          />
        </Button>
      </Box>
      <Divider />
      <Box display="flex" justifyContent="space-between" alignItems="center" padding={1}>
        <Typography variant="caption">{fToNow(notification.creation_time)}</Typography>
        {/* <IconButton color="error" onClick={() => onDeleteNotification(notification.guideline_id)}>
          <DeleteIcon />
        </IconButton> */}
      </Box>
    </StyledCard>
  );
};

function NotificationList({ notifications, handleMarkAllAsRead, onDeleteNotification }) {
  return (
    <List disablePadding>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onNotificationClick={handleMarkAllAsRead}
          onDeleteNotification={() => onDeleteNotification(notification.video_id)}
        />
      ))}
    </List>
  );
}
function HeaderNotifications() {
  const [notifications, setNotifications] = useState([]);
  const totalUnRead = notifications.filter((item) => item.isUnread === 1)
    .length;
  const [open, setOpen] = useState(null);
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    handleMarkAllAsRead();
    setOpen(null);
  };

  const user_token = localStorage.getItem("shiksha-niyojak");
  const ref = useRef(null);

  const handleMarkAllAsRead = async () => {
    try {
      await axios.post(
        `${backendURL}/DeptHead/setNotificationSeen`,
        { user_id: notifications[0].user_id },
        {
          headers: {
            "shiksha-niyojak": user_token,
          },
        }
      );
      setNotifications(
        notifications.map((notification) => ({
          ...notification,
          isUnread: 0,
        }))
      );
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };
  const handleNotificationClick = async (id) => {
    try {
      await axios.post(
        `${backendURL}/DeptHead/setNotificationSeen`,
        { user_id: notifications[0].id },
        {
          headers: {
            "shiksha-niyojak": user_token,
          },
        }
      );
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id
            ? { ...notification, isUnread: 0 }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      await axios.delete(`${backendURL}/DeptHead/deleteNotification`, {
        data: {
          user_id: notifications[0].id,
          guideline_id: notifications[0].guideline_id,
        },
        headers: {
          "shiksha-niyojak": user_token,
        },
      });
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.video_id !== id)
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  React.useEffect(() => {
    const fetchNotifications = async () => {
      try {
        console.log("Fetching notifications...");
        console.log(user_token)
        const response = await axios.get(backendURL+'/DeptHead/getNotifications', {
          headers: {
            "shiksha-niyojak": user_token,
          },
        });
        console.log("Response:", response.data);
        if (Array.isArray(response.data.notifications)) {
          setNotifications(response.data.notifications);
        } else {
          console.error("Data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, [user_token]);

  const newNotifications = notifications.filter(
    (notification) => notification.isUnread
  );

  const otherNotifications = notifications.filter(
    (notification) => !notification.isUnread
  );
  console.log(newNotifications);
  console.log(otherNotifications);
  return (
    <>
      <Tooltip arrow title="Notifications">
        <IconButton color="primary" ref={ref} onClick={handleOpen}>
          <NotificationsBadge
            badgeContent={totalUnRead}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <NotificationsActiveTwoToneIcon />
          </NotificationsBadge>
        </IconButton>
      </Tooltip>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
            p: 2,  // Added padding
          },
        }}
      >
        <Box>
          <Typography variant="h6" gutterBottom>
            New Notifications
          </Typography>
          <NotificationList
            notifications={newNotifications}
            onNotificationClick={handleNotificationClick}
            onDeleteNotification={handleDeleteNotification}
          />
        </Box>

        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            Other Notifications
          </Typography>
          <NotificationList
            notifications={otherNotifications}
            onNotificationClick={handleNotificationClick}
            onDeleteNotification={handleDeleteNotification}
          />
        </Box>
      </Popover>
    </>
  );
}

export default HeaderNotifications;
// function NotificationItem({
//   notification,
//   onNotificationClick,
//   onDeleteNotification,
// }) {
//   const handleNotificationClick = () => {
//     onNotificationClick(notification.id);
//   };
//   const handleDeleteNotification = () => {
//     onDeleteNotification(notification.guideline_id);
//   };
//   return (
//     <ListItemButton
//       sx={{
//         py: 1.5,
//         px: 2.5,
//         mt: "1px",
//         bgcolor: notification.isUnread ? "background.paper" : "action.focus",
//       }}
//       onClick={handleNotificationClick}
//     >
//       <ListItemText
//         primary={
//           <Typography
//             sx={{
//               color: "text.black",
//             }}
//           >
//             {notification.title}
//         }
//           </Typography>
//         secondary={
//           <Typography
//             variant="caption"
//             sx={{
//               mt: 0.5,
//               display: "flex",
//               alignItems: "center",
//               color: "text.darkGrey",
//             }}
//           >
//             {fToNow(notification.creation_time)}
//           </Typography>
//         }
//       />
//       <IconButton
//         edge="end"
//         aria-label="delete"
//         onClick={handleDeleteNotification}
//       >
//         <DeleteIcon />
//       </IconButton>
//     </ListItemButton>
//   );
// }



// <Tooltip arrow title="Notifications">
// <IconButton color="primary" ref={ref} onClick={handleOpen}>
//   <NotificationsBadge
//     badgeContent={totalUnRead}
//     anchorOrigin={{
//       vertical: 'top',
//       horizontal: 'right'
//     }}
//   >
//     <NotificationsActiveTwoToneIcon />
//   </NotificationsBadge>
// </IconButton>
// </Tooltip>
// <Popover
// open={Boolean(open)}
// anchorEl={open}
// onClose={handleClose}
// anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
// transformOrigin={{ vertical: "top", horizontal: "right" }}
// PaperProps={{
//   sx: {
//     mt: 1.5,
//     ml: 0.75,
//     width: 360,
//     p: 2,  // Added padding
//   },
// }}
// >
// <Typography variant="subtitle1" sx={{ color: "text.black" }}>
//   Notifications
// </Typography>
// <Typography variant="body2" sx={{ color: "text.black", mb: 2 }}>
//   You have {totalUnRead} unread messages
// </Typography>

// <Divider sx={{ borderStyle: "solid" }} />

// <Scrollbar sx={{ height: { xs: 340, sm: "auto" } }}>
//   <List
//     disablePadding
//     subheader={
//       <ListSubheader
//         disableSticky
//         sx={{
//           py: 1,
//           px: 2.5,
//           typography: "overline",
//           color: "text.darkGrey",
//         }}
//       >
//         New
//       </ListSubheader>
//     }
//   >
//     {newNotifications.map((notification) => (
//       <NotificationItem
//         key={notification.id}
//         notification={notification}
//         onNotificationClick={handleNotificationClick}
//         onDeleteNotification={() =>
//           handleDeleteNotification(notification.video_id)
//         }
//       />
//     ))}
//   </List>

//   <List
//     disablePadding
//     subheader={
//       <ListSubheader
//         disableSticky
//         sx={{
//           py: 1,
//           px: 2.5,
//           typography: "overline",
//           color: "text.darkGrey",
//         }}
//       >
//         Before that
//       </ListSubheader>
//     }
//   >
//     {otherNotifications.map((notification) => (
//       <NotificationItem
//         key={notification.id}
//         notification={notification}
//         onNotificationClick={handleNotificationClick}
//         onDeleteNotification={() =>
//           handleDeleteNotification(notification.video_id)
//         }
//       />
//     ))}
//   </List>
// </Scrollbar>
// <Divider sx={{ borderStyle: "dashed" }} />
// </Popover>
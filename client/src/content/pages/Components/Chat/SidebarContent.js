import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  Tabs,
  Tab,
  TextField,
  IconButton,
  InputAdornment,
  Avatar,
  List,
  Button,
  Tooltip,
  Divider,
  AvatarGroup,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  lighten,
  styled,
} from "@mui/material";
import { formatDistance, subMinutes, subHours } from "date-fns";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import Label from "../../../../components/Label";
import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";
import AlarmTwoToneIcon from "@mui/icons-material/AlarmTwoTone";
import { Link as RouterLink } from "react-router-dom";
import ChatBubbleTwoToneIcon from "@mui/icons-material/ChatBubbleTwoTone";
import axios from "axios";
import { backendURL } from "../../../../configKeys";

//$ Group Chat
//# Subject Name
//# Last Msg

//$ Members
// #Name
// #Last Msg
// #Photo
// #Unseen Msg
// #Time of Receiving
// #2 Filters (All,unread) flags

//$ Meetings
//# Today's Meeting from Calendar

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
          background-color: ${theme.colors.success.lighter};
          color: ${theme.colors.success.main};
          width: ${theme.spacing(8)};
          height: ${theme.spacing(8)};
          margin-left: auto;
          margin-right: auto;
    `
);

const MeetingBox = styled(Box)(
  ({ theme }) => `
          background-color: ${lighten(theme.colors.alpha.black[10], 0.5)};
          margin: ${theme.spacing(2)} 0;
          border-radius: ${theme.general.borderRadius};
          padding: ${theme.spacing(2)};
    `
);

const RootWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(2.5)};
  `
);

const ListItemWrapper = styled(ListItemButton)(
  ({ theme }) => `
        &.MuiButtonBase-root {
            margin: ${theme.spacing(1)} 0;
        }
  `
);

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTabs-indicator {
            min-height: 4px;
            height: 4px;
            box-shadow: none;
            border: 0;
        }

        .MuiTab-root {
            &.MuiButtonBase-root {
                padding: 0;
                margin-right: ${theme.spacing(3)};
                font-size: ${theme.typography.pxToRem(16)};
                color: ${theme.colors.alpha.black[50]};

                .MuiTouchRipple-root {
                    display: none;
                }
            }

            &.Mui-selected:hover,
            &.Mui-selected {
                color: ${theme.colors.alpha.black[100]};
            }
        }
  `
);

function SidebarContent(props) {
  const user = {
    name: "Kriti",
    avatar: "/static/images/avatars/1.jpg",
    jobtitle: "Software Developer",
  };

  const [state, setState] = useState({
    invisible: true,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const [currentTab, setCurrentTab] = useState("all");

  const tabs = [
    { value: "all", label: "All" },
    { value: "unread", label: "Unread" },
  ];

  const handleTabsChange = (_event, value) => {
    setCurrentTab(value);
  };

  return (
    <RootWrapper>
      <Box display="flex" alignItems="flex-start">
        <Avatar alt={user.name} src={user.avatar} />
        <Box
          sx={{
            ml: 1.5,
            flex: 1,
          }}>
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between">
            <Box>
              <Typography variant="h5" noWrap>
                {user.name}
              </Typography>
              <Typography variant="subtitle1" noWrap>
                Curriculum Developer
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ ml: "15%", mr: "15%", my: 3 }} justifyContent="center">
        <Button endIcon={<ChatBubbleTwoToneIcon />} variant="contained">
          Start New Chat
        </Button>
      </Box>

      <Divider />

      {/* <TextField
        sx={{
          mt: 2,
          mb: 1,
        }}
        size="small"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchTwoToneIcon />
            </InputAdornment>
          ),
        }}
        placeholder="Search..."
      /> */}

      <Typography
        sx={{
          mb: 1,
          mt: 2,
        }}
        variant="h3">
        Chats
      </Typography>

      <TabsContainerWrapper>
        <Tabs
          onChange={handleTabsChange}
          value={currentTab}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary">
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </TabsContainerWrapper>

      <Box mt={2}>
        {currentTab === "all" && (
          <List disablePadding component="div">
            <ListItemWrapper selected>
              <ListItemAvatar>
                <Avatar src="/static/images/avatars/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  mr: 1,
                }}
                primaryTypographyProps={{
                  color: "textPrimary",
                  variant: "h5",
                  noWrap: true,
                }}
                secondaryTypographyProps={{
                  color: "textSecondary",
                  noWrap: true,
                }}
                primary="Zain Baptista"
                secondary="Hey there, how are you today? Is it ok if I call you?"
              />
              <Label color="primary">
                <b>2</b>
              </Label>
            </ListItemWrapper>
          </List>
        )}
        {currentTab === "unread" && (
          <List disablePadding component="div">
            <ListItemWrapper>
              <ListItemAvatar>
                <Avatar src="/static/images/avatars/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  mr: 1,
                }}
                primaryTypographyProps={{
                  color: "textPrimary",
                  variant: "h5",
                  noWrap: true,
                }}
                secondaryTypographyProps={{
                  color: "textSecondary",
                  noWrap: true,
                }}
                primary="Zain Baptista"
                secondary="Hey there, how are you today? Is it ok if I call you?"
              />
              <Label color="primary">
                <b>2</b>
              </Label>
            </ListItemWrapper>
            <ListItemWrapper>
              <ListItemAvatar>
                <Avatar src="/static/images/avatars/4.jpg" />
              </ListItemAvatar>
              <ListItemText
                sx={{
                  mr: 1,
                }}
                primaryTypographyProps={{
                  color: "textPrimary",
                  variant: "h5",
                  noWrap: true,
                }}
                secondaryTypographyProps={{
                  color: "textSecondary",
                  noWrap: true,
                }}
                primary="Adison Press"
                secondary="I recently did some buying on Amazon and now I'm stuck"
              />
              <Label color="primary">
                <b>8</b>
              </Label>
            </ListItemWrapper>
          </List>
        )}
      </Box>
    </RootWrapper>
  );
}

export default SidebarContent;

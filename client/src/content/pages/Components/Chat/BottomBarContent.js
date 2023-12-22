/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/label-has-for */
import {
  Avatar,
  Tooltip,
  IconButton,
  Box,
  Button,
  styled,
  InputBase,
  useTheme,
} from "@mui/material";
import AttachFileTwoToneIcon from "@mui/icons-material/AttachFileTwoTone";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import { useState } from "react";
import axios from "axios";

const MessageInputWrapper = styled(InputBase)(
  ({ theme }) => `
      font-size: ${theme.typography.pxToRem(16)};
      padding: ${theme.spacing(1)};
      width: 80%;
  `
);

const Input = styled("input")({
  display: "none",
});

function BottomBarContent() {
  const theme = useTheme();
  const [message, setMessage] = useState("");

  const handleChangeMessage = ({ target }) => {
    setMessage(target.value);
  };

  const handleSend = () => {};

  const user = {
    name: "Kriti",
    avatar: "/static/images/avatars/1.jpg",
  };

  return (
    <Box
      sx={{
        background: theme.colors.alpha.white[50],
        display: "flex",
        alignItems: "center",
        p: 2,
      }}>
      <Box flexGrow={1} display="flex" alignItems="center">
        <Avatar
          sx={{ display: { xs: "none", sm: "flex" }, mr: 1 }}
          alt={user.name}
          src={user.avatar}
        />
        <MessageInputWrapper
          autoFocus
          placeholder="Write your message here..."
          fullWidth
          onChange={handleChangeMessage}
        />
      </Box>
      <Box>
        <Button
          startIcon={<SendTwoToneIcon />}
          variant="contained"
          onClick={handleSend}>
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default BottomBarContent;

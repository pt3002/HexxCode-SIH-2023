import PropTypes from "prop-types";
import Scrollbar from "../../../components/Scrollbar";
import {
  Tooltip,
  useTheme,
  Drawer,
  Stack,
  Typography,
  IconButton,
  Divider,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  styled,
  Button,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Close from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendURL } from "../../../configKeys";
import LockTwoTone from "@mui/icons-material/LockTwoTone";
import Text from "../../../components/Text";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { fToNow } from "../../../utils/formatTime";
import diffSaves from "./Revisions/diffSaves";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import RevisionModal from "./Revisions/revisionModal";

const AvatarWrapperError = styled(Avatar)(
  ({ theme }) => `
        background-color: ${theme.colors.error.lighter};
        color:  ${theme.colors.error.main};
  `
);

DocumentHistorySideBar.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  doc: PropTypes.any,
};

export default function DocumentHistorySideBar({
  openFilter,
  onOpenFilter,
  onCloseFilter,
  doc,
}) {
  const theme = useTheme();
  const [commits, setCommits] = useState([]);
  const [open, setOpen] = useState(false);

  const [rev, setRevs] = useState([])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(async () => {
    if (doc && doc._id) {
      await axios
        .get(backendURL + "/curriculumDeveloper/commitHistory/" + doc._id, {
          headers: {
            "shiksha-niyojak": localStorage.getItem("shiksha-niyojak"),
          },
        })
        .then((resp) => {
          //console.log(resp.data)
          setCommits(resp.data.history);
        });
    }
  }, [doc]);
  //console.log(openFilter, onOpenFilter, onCloseFilter, doc)
  return (
    <>
      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 360, border: "none", overflow: "hidden" },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            {doc.title} - History
          </Typography>
          <Tooltip title="Close History" arrow>
            <IconButton
              sx={{
                "&:hover": {
                  background: theme.colors.alpha.black[10],
                },
                marginRight: 1,
                color: theme.colors.primary.main,
              }}
              color="inherit"
              size="small"
              onClick={onCloseFilter}
            >
              <Close fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>

        <Divider />
        <Scrollbar>
          {commits.map((commit, index) => {
            //console.log(commit)
            return (
              <Card sx={{ m: 2 }}>
                <List disablePadding>
                  <ListItem sx={{ py: 2 }}>
                    <ListItemAvatar>
                      <AvatarWrapperError>
                        <LockTwoTone />
                      </AvatarWrapperError>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Text color="black">Type : {commit.commitType}</Text>
                      }
                      primaryTypographyProps={{
                        variant: "body1",
                        fontWeight: "bold",
                        color: "textPrimary",
                        gutterBottom: true,
                        noWrap: true,
                      }}
                      secondary={
                        <Text color="error">
                          Message : {commit.commitMessage}
                        </Text>
                      }
                      secondaryTypographyProps={{
                        variant: "body2",
                        noWrap: true,
                      }}
                    />
                    {
                      index > 0 && (
                        <Button onClick={() => {setRevs(diffSaves(commits[index-1], commits[index])); handleClickOpen();}}>Compare with Past</Button>
                      )
                    }
                    
                  </ListItem>
                  <ListItemText
                    secondary={
                      <Text color="success">
                        <AccessTimeIcon /> {fToNow(commit.createdAt)} by {commit.cdname}
                      </Text>
                    }
                    secondaryTypographyProps={{
                      variant: "body3",
                      noWrap: true,
                    }}
                  />
                </List>
              </Card>
            );
          })}
        </Scrollbar>
      </Drawer>

      {/* Dialog to show version history */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Version History since previous Save</DialogTitle>
        <DialogContent>
          <Box p={2}>
            <RevisionModal rev = {rev} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

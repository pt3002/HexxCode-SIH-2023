import React from "react";
import {
  Button,
  Card,
  Grid,
  Box,
  CardContent,
  Typography,
  Avatar,
  alpha,
  Tooltip,
  CardActionArea,
  styled,
  TextField,
  Popover,
  Paper,
} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { fDate } from "../../../utils/formatTime";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { backendURL } from "../../../configKeys";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
      margin: ${theme.spacing(2, 0, 1, -0.5)};
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: ${theme.spacing(1)};
      padding: ${theme.spacing(0.5)};
      border-radius: 60px;
      height: ${theme.spacing(5.5)};
      width: ${theme.spacing(5.5)};
      background: ${
        theme.palette.mode === "dark"
          ? theme.colors.alpha.trueWhite[30]
          : alpha(theme.colors.alpha.black[100], 0.07)
      };
    
      img {
        background: ${theme.colors.alpha.trueWhite[100]};
        padding: ${theme.spacing(0.5)};
        display: block;
        border-radius: inherit;
        height: ${theme.spacing(4.5)};
        width: ${theme.spacing(4.5)};
      }
  `
);

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
          background: ${theme.colors.alpha.black[10]};
          color: ${theme.colors.primary.main};
          width: ${theme.spacing(8)};
          height: ${theme.spacing(8)};
  `
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
          border: ${theme.colors.primary.main} dashed 1px;
          height: 100%;
          color: ${theme.colors.primary.main};
          transition: ${theme.transitions.create(["all"])};
          
          .MuiCardActionArea-root {
            height: 100%;
            justify-content: center;
            align-items: center;
            display: flex;
          }
          
          .MuiTouchRipple-root {
            opacity: .2;
          }
          
          &:hover {
            border-color: ${theme.colors.alpha.black[70]};
          }
  `
);

const uuid = require("uuid").v4;

export default function ViewGroups() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [Edit, setEdit] = useState(0);
  const [groups, setGroups] = useState([]);
  const [add, setAdd] = useState(1); //add-1 view-0
  const [selectedGroup, setSelectedGroup] = useState(
    {
        id: "",
        department: "",
        subject_name: "",
        creation_date: "",
    }
  );


  const handleClose = () => {
    setOpen(false);
  };

  const [newGroup, setNewGroup] = useState({
    department: "CSE",
    subject_name: "",
  });

  const viewGroup = (item) => {
    setAdd(0);
    setSelectedGroup(item);
    setOpen(true);
  };

  const handleAddGroup = () => {
    setAdd(1);
    let body = {
      id: uuid(),
      department: newGroup.department,
      subject_name: newGroup.subject_name
    };

    axios
      .post(backendURL + "/DeptHead/addGroup", body)
      .then((res) => {
        if (res.data.message) {
          Swal.fire({
            icon: "success",
            title: "SUCCESS",
            text: res.data.message,
            showConfirmButton: false,
            timer: 3000,
          }).then((confirm) => {
            if (confirm) {
              window.location.reload();
            }
          });
        } else if (res.data.error) {
          Swal.fire({
            icon: "error",
            title: "ERROR",
            text: res.data.error,
            showConfirmButton: false,
            timer: 3000,
          });
        }
      });

    setOpen(false);
  };


  React.useEffect(() => {
    let body = { department: newGroup.department };
    axios
      .post(backendURL + "/DeptHead/getAllSubjectNamesByDepartment", body)
      .then((res) => {
        setGroups(res.data.subjects);
      });
  }, []);
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 3,
        }}
      >
        <Typography variant="h3" sx={{margin: '2%'}}>VIEW GROUPS</Typography>
        {/* <Button
          size="small"
          variant="outlined"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Add new wallet
        </Button> */}
      </Box>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3} item>
          <Tooltip arrow title="Click to add a new Group">
            <CardAddAction>
              <CardActionArea
                sx={{
                  px: 1,
                }}
                
              >
                <CardContent>
                  <AvatarAddWrapper>
                    <AddTwoToneIcon onClick={()=> {setAdd(1);setOpen(true)}} fontSize="large" />
                  </AvatarAddWrapper>
                </CardContent>
              </CardActionArea>
            </CardAddAction>
          </Tooltip>
        </Grid>
        {groups.map((item) => (
          <>
            <Grid xs={12} sm={6} md={3} item key={item.id}>
              <Card
                sx={{
                  px: 1,
                  backgroundColor: '#00ABBD',
                  color: 'white',
                  '&:hover': {
                    textDecorationColor: 'white',
                    // backgroundColor: '#00D7FF',
                    backgroundColor: '#0097b3',
                    
                    boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
                  },
                }}
                onClick={()=>{navigate("/deptHead/viewGroupInfo",{
                  state: {
                    group_id: item.id,
                    subject_name: item.subject_name
                  },
                })}}
              >
                <CardContent>
                  <Typography variant="h5" noWrap>
                    SUBJECT: {item.subject_name}
                  </Typography>
                  <Box
                    sx={{
                      pt: 3,
                    }}
                  >
                    <Typography variant="subtitle2" noWrap sx={{color:'white'}}>
                      Created at: {item.creation_date}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </>
        ))}
      </Grid>
      {
        add===0?
        (
            <Dialog open={open} onClose={handleClose}>
        <DialogTitle>GROUP for {selectedGroup.subject_name}</DialogTitle>
        {/* <DialogContent>
                </DialogContent>
                <DialogActions>

                </DialogActions> */}
      </Dialog>
        ) :
        (
            <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {Edit ? "EDIT GROUP" : "ADD NEW GROUP"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="subject_name"
            label="Subject Name"
            type="text"
            fullWidth
            variant="standard"
            value={newGroup.subject_name}
            onChange={(e) => {
              setNewGroup({
                ...newGroup,
                subject_name: e.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {Edit ? (
            <Button onClick={()=>{}}>Edit</Button>
          ) : (
            <Button onClick={handleAddGroup}>Add</Button>
          )}
        </DialogActions>
      </Dialog>
        )
      }
      
    </>
  );
}

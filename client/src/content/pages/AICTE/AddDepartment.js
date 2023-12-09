import * as React from 'react';
import Box from '@mui/material/Box';
import {
    DataGrid,
    GridToolbar,
  } from "@mui/x-data-grid";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'email',
    width: 150,
    editable: true,
  },
  {
    field: 'university',
    headerName: 'university',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon',email: 'demo@gmail.com', university: "SPPU" },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei',email: 'demo@gmail.com', university: "SPPU" },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', university: "SPPU" },
  { id: 4, lastName: 'Stark', firstName: 'Arya',email: 'demo@gmail.com', university: "SPPU" },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys',email: 'demo@gmail.com', university: "SPPU" },
  { id: 6, lastName: 'Melisandre', firstName: 'Sheldon',email: 'demo@gmail.com', university: "SPPU" },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara',email: 'demo@gmail.com', university: "SPPU" },
  { id: 8, lastName: 'Frances', firstName: 'Rossini',email: 'demo@gmail.com', university: "SPPU" },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey',email: 'demo@gmail.com', university: "SPPU" },
];


export default function AddDepartment() {
  const [open, setOpen] = React.useState(false);
//   const [newDepartment, setNewDepartment] = useState({
    
//   })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
    <Button variant="contained" size="large" onClick={handleClickOpen}>
    Large
  </Button>

    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        slots={{ toolbar: GridToolbar }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              puniversitySize: 5,
            },
          },
        }}
        puniversitySizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>

    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ADD NEW DEPARTMENT</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="First Name"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Last Name"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="College"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Designation"
            type="email"
            fullWidth
            variant="standard"
          />
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
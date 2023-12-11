import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import { Button, Typography, Grid, TextField, Box, TextareaAutosize, InputLabel} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

function CreateDocument(){

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

    return(
        <>
            <Helmet>
                <title>Documents Page</title>
            </Helmet>
            <PageTitleWrapper>
                <Grid container justifyContent = "space-between" alignItems = "center">
                    <Grid item>
                <Typography variant = "h3" component = "h3" gutterBottom>
                    Documents Page
                </Typography>
                <Typography variant = "subtitle2">
                    This is Projects and Drafts panel
                </Typography>
                </Grid>
                <Grid item>
                    <Button
                    sx = {{mt : {xs : 2, md:0}}}
                    variant = "contained"
                    onClick={handleClickOpen}
                    >
                        Create Document
                    </Button>
                </Grid>
                </Grid>
            </PageTitleWrapper>
            <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Create New Document</DialogTitle>
        <DialogContent >
            <Box p = {2} >
            <TextField
                      required
                      id="outlined-required"
                      label="Document Title"
                      placeholder="Document Title"
                    />
            <Grid item xs={12}>
                <TextareaAutosize
                    required
                    id="research"
                    name="research"
                    aria-label=""
                    placeholder="List your areas of expertise/ research"
                    minRows={1}
                    fullWidth
                    style={{
                        padding: '10px', 
                        fontSize: '16px', 
                        border: '1px solid #ccc', 
                        borderRadius: '5px', 
                        width: '100%',
                        boxSizing: 'border-box', 
                    }}
                />
            </Grid>
            </Box>
            
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create</Button>
        </DialogActions>
      </Dialog>

        </>
    )
}

export default CreateDocument
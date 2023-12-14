import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container, Grid, Card } from '@mui/material';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import { Helmet } from 'react-helmet-async';
import PageTitle from '../../../components/PageTitle';
import { CardContent } from '@material-ui/core';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function DiscussionForum() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Helmet>Discussion Forum</Helmet>
    {/* <PageTitleWrapper>
        <PageTitle
        heading = "Discussion Forum"
        subHeading='This is used for discussion'>

        </PageTitle>
    </PageTitleWrapper> */}
    <Container maxWidth = "lg" sx = {{mt:5}}>
        <Grid
        container
        direction = "row"
        justifyContent="center"
        alignItems="stretch"
        spacing = {3}
        >
            <Card>
                <CardContent>
                <Box sx={{ width: '100%' }}>
        <Tabs 
        variant="scrollable"
        scrollButtons="auto"
        textColor="primary"
        indicatorColor="primary"
        value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Newest" {...a11yProps(0)} />
          <Tab label="Trending" {...a11yProps(1)} />
          <Tab label="Tags" {...a11yProps(2)} />
          <Tab label = "Unanswered" {...a11yProps(3)} />
          <Tab label = "Badges" {...a11yProps(4)} />
        </Tabs>
      </Box>
      
                </CardContent>
            </Card>
        </Grid>
    
    </Container>

    <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item Four
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Item Four
      </CustomTabPanel>
    </>
    
  );
}
import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import { Typography } from '@mui/material';

function CreateDocument(){
    return(
        <>
            <Helmet>
                <title>Documents Page</title>
            </Helmet>
            <PageTitleWrapper>
                <Typography variant = "h3" component = "h3" gutterBottom>
                    Documents Page
                </Typography>
                <Typography variant = "subtitle2">
                    This is Projects and Drafts panel
                </Typography>
            </PageTitleWrapper>
        </>
    )
}

export default CreateDocument
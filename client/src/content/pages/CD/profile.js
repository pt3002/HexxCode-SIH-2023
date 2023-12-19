import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  CardMedia,
  Button,
  IconButton,
  styled
} from '@mui/material';

import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import { Directions } from '@mui/icons-material';
import UserTokenContext from '../../../contexts/UserTokenContext';
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { backendURL } from '../../../configKeys';

const Input = styled('input')({
  display: 'none'
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);

const user = {
  savedCards: 7,
  name: 'Catherine Pike',
  coverImg: '/static/images/placeholders/covers/5.jpg',
  avatar: '/static/images/avatars/4.jpg',
  description:
    "",
  jobtitle: 'Web Developer',
  location: 'Barcelona, Spain',
  followers: '465'
};

const ProfileCover = () => {
  const userContext = useContext(UserTokenContext)
    const { dict, checkToken } = userContext;
    const [userData, setUserData] = useState([])
    useEffect(() => {
      checkToken()
      
  }, [])

  useEffect(() => {
    let body = {
        id : dict.details.id
      }
      axios.post(backendURL + "/curriculumDeveloper/profile", body).then((res) => {
        setUserData(res.data.ans[0])
      })
  }, [dict])

  console.log(userData)

  return (
    <>
    {
        dict && (
            <>
      <Box display="flex" m={3}>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            Welcome {dict.details.name} !
          </Typography>
          <Typography variant="subtitle2">
            Shiksha Niyojak an Easy to Use Curriculum Development and Management Tool
          </Typography>
        </Box>
      </Box>
      <Card sx ={{m:2}}>
      <Box py={2} pl={2} mb={3}>
        <Typography gutterBottom variant="h4" sx = {{mb:3}}>
          {dict.details.name}
        </Typography>
        <Typography variant="subtitle2">{user.description}</Typography>
        <Typography sx={{ m:0.5 }} variant="subtitle2" color="text.primary">
          College : {userData.college}
        </Typography>
        <Typography sx={{ m:0.5 }} variant="subtitle2" color="text.primary">
          Department : {userData.department}
        </Typography>
        <Typography sx={{ m:0.5 }} variant="subtitle2" color="text.primary">
          Registered Email : {userData.email}
        </Typography>

      </Box>
      </Card>
      
      </>
      )
    }
    </>
  );
};

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired
};

export default ProfileCover;

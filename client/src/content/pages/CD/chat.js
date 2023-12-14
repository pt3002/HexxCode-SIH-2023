import { useState } from "react";

import { Helmet } from "react-helmet-async";

import TopBarContent from "../Components/Chat/TopBarContent"
import BottomBarContent from "../Components/Chat/BottomBarContent";
import SidebarContent from "../Components/Chat/SidebarContent";
import ChatContent from "../Components/Chat/ChatContent";
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';

import Scrollbar from "../../../components/Scrollbar";

import axios from "axios";
import { useEffect, useContext } from "react";
import { backendURL } from "../../../configKeys";

import UserTokenContext from "../../../contexts/UserTokenContext";

import {
    Box,
    styled,
    Divider,
    Drawer,
    IconButton,
    useTheme
  } from '@mui/material';
  
  const RootWrapper = styled(Box)(
    ({ theme }) => `
         height: calc(100vh - ${theme.header.height});
         display: flex;
  `
  );
  
  const Sidebar = styled(Box)(
    ({ theme }) => `
          width: 300px;
          background: ${theme.colors.alpha.white[100]};
          border-right: ${theme.colors.alpha.black[10]} solid 1px;
  `
  );
  
  const ChatWindow = styled(Box)(
    () => `
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          flex: 1;
  `
  );
  
  const ChatTopBar = styled(Box)(
    ({ theme }) => `
          background: ${theme.colors.alpha.white[100]};
          border-bottom: ${theme.colors.alpha.black[10]} solid 1px;
          padding: ${theme.spacing(2)};
          align-items: center;
  `
  );
  
  const IconButtonToggle = styled(IconButton)(
    ({ theme }) => `
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    background: ${theme.colors.alpha.white[100]};
  `
  );
  
  const DrawerWrapperMobile = styled(Drawer)(
    () => `
      width: 340px;
      flex-shrink: 0;
  
    & > .MuiPaper-root {
          width: 340px;
          z-index: 3;
    }
  `
  );

  function Chat() {
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [chats, setChats] = useState([])
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    const userContext = useContext(UserTokenContext)
    const {dict, checkToken} = userContext

    useEffect(() => {
      checkToken()
      // getting all chats for a particular user
      axios.get(backendURL + "/curriculumDeveloper/fetchChats", {
        "headers" : {
          "shiksha-niyojak" : localStorage.getItem("shiksha-niyojak")
        }
      }).then((resp) => {
        //console.log(resp)
        let c = resp.data.chats
        for(let i = 0 ; i<c.length; i++){
          if(c[i]["isGroupChat"] == false){
            // get name of user from backend
            if(c[i]["userIds"][0] != dict.id){
              axios.get(backendURL + "/curriculumDeveloper/getCDName/" + c[i]["userIds"][0]).then((resp_cdname) => {
                c[i]["chatName"] = resp_cdname.data.name
              })
            }
            else{
              axios.get(backendURL + "/curriculumDeveloper/getCDName/" + c[i]["userIds"][1]).then((resp_cdname) => {
                c[i]["chatName"] = resp_cdname.data.name
              })
            }
          }
        }
        setChats(c)
      })
    }, [])
  
    return (
      <>
        <Helmet>
          <title>Messenger - Applications</title>
        </Helmet>
        <RootWrapper className="Mui-FixedWrapper">
          <DrawerWrapperMobile
            sx={{
              display: { lg: 'none', xs: 'inline-block' }
            }}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
          >
            <Scrollbar>
              <SidebarContent />
            </Scrollbar>
          </DrawerWrapperMobile>
          <Sidebar
            sx={{
              display: { xs: 'none', lg: 'inline-block' }
            }}
          >
            <Scrollbar>
              <SidebarContent chats = {chats}/>
            </Scrollbar>
          </Sidebar>
          <ChatWindow>
            <ChatTopBar
              sx={{
                display: { xs: 'flex', lg: 'inline-block' }
              }}
            >
              <IconButtonToggle
                sx={{
                  display: { lg: 'none', xs: 'flex' },
                  mr: 2
                }}
                color="primary"
                onClick={handleDrawerToggle}
                size="small"
              >
                <MenuTwoToneIcon />
              </IconButtonToggle>
              <TopBarContent />
            </ChatTopBar>
            <Box flex={1}>
              <Scrollbar>
                <ChatContent />
              </Scrollbar>
            </Box>
            <Divider />
            <BottomBarContent />
          </ChatWindow>
        </RootWrapper>
      </>
    );
  }
  
  export default Chat;
  
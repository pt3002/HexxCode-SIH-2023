import { useTheme } from "@emotion/react";
import UserTokenContext from "../../../contexts/UserTokenContext";
import { useContext, useEffect, useState } from "react";
import ProfileCover from "./profile";
import {backendURL} from "../../../configKeys"
 import axios from "axios"

function CDDashboard(){
    const theme = useTheme();

    const userContext = useContext(UserTokenContext)
    const { dict, checkToken } = userContext;

    useEffect(() => {
        checkToken()
    }, [])

    return(
        <ProfileCover />
    )
}

export default CDDashboard
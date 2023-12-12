import UserTokenContext from "./UserTokenContext";
import { useState } from "react";
import React from "react";
import axios from "axios";
import { backendURL } from "../configKeys";
import {useNavigate} from "react-router-dom"

const UserTokenState = (props) => {
    const [dict, setDict] = useState([])
    const navigate = useNavigate();
    const checkToken = () => {
        let token = localStorage.getItem("shiksha-niyojak")

        // send backend req to check role,id,name,email
        axios.get(backendURL + "/auth", {
            "headers" : {
                "shiksha-niyojak" : token
            }
        }).then((res) => {
            setDict(res.data["details"])
        })
        
    }

    return(
        <UserTokenContext.Provider value = {{dict, checkToken}}>
            {props.children}
        </UserTokenContext.Provider>
    )
}

export default UserTokenState;
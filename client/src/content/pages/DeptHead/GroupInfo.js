import React from 'react'
import { useLocation } from "react-router-dom";

export default function GroupInfo(props) {

  //Note: We can use location.state.group_id to display CDs subject wise
  const location = useLocation();
  return (
    <div>GroupInfo for {location.state.subject_name}</div>
  )
}

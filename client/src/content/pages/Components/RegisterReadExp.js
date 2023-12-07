import React from "react";
import {
    Box,
    Grid,
    Paper,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    TableContainer,
} from "@material-ui/core";
import { renderButton } from "./displayComponents";

const RegisterReadExp = ({ contact, handleEditClick, handleDeleteClick }) => {
    return (
        <TableRow>
            <TableCell>{contact.workPlace}</TableCell>
            <TableCell>{contact.rankDesignation}</TableCell>
            <TableCell>{contact.years}</TableCell>
            {/* <TableCell>{contact.workNature}</TableCell> */}
            <TableCell>
                {/* <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button> */}

                {renderButton({
                    label: "Delete",
                    handleOnClick: () => handleDeleteClick(contact.id),
                })}
            </TableCell>
        </TableRow>
    );
};

export default RegisterReadExp;

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Snackbar,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from '@mui/icons-material/Delete';
import VolLocationDialog from './VolLocationDialog.jsx'
import '../styles/RequestsPage.css';
import { deleteFirestoreDocument } from "../middleware/firestore/index"; // Import the function to delete a document

const TableActionsDialog = ({
  uid,
  handleDeleteRequest,
  isActiveTask,
  status,
  volLocation
}) => {
  const [tableActionsDialogState, setTableActionsDialogState] = useState(false);
  const [snackbarSuccessOpen, setSnackbarSuccessOpen] = useState(false);
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);

  const handleTableActionsDialogClose = () => {
    setTableActionsDialogState(false);
  }

  const handleDeleteButtonClick = async () => {
    if (status === "נסגר") {
      await deleteFirestoreDocument("requests", uid);
      setSnackbarSuccessOpen(true);
    } else {
      console.log("Cannot delete request because status is not over");
      setSnackbarErrorOpen(true);
    }
  };

  const handleSnackbarSuccessClose = () => {
    setSnackbarSuccessOpen(false);
  };

  const handleSnackbarErrorClose = () => {
    setSnackbarErrorOpen(false);
  };

  return (
    <>
      <div>
        <Button
          variant="contained"
          id="open-new-request-button"
          onClick={() => {
            setTableActionsDialogState(true);
          }}
        >
          <SettingsIcon />
        </Button>
        <Dialog open={tableActionsDialogState} onClose={handleTableActionsDialogClose}>
          <DialogTitle>פעולות נוספות</DialogTitle>
          <DialogContent>
            <List className="openTask-task-list">
              {/* Conditionally render the Delete Request button */}
              {status === "נסגר" && (
                <ListItemButton
                  onClick={handleDeleteButtonClick}
                  sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '2em'}}
                >
                  <ListItemText primary={"מחיקת בקשה"} />
                  <DeleteIcon/>
                </ListItemButton>
              )}
              <VolLocationDialog volLocation={volLocation}/>
              <ListItemButton
                onClick={() => handleDeleteRequest(uid)}
                disabled={!isActiveTask(status)}
                sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '2em'}}
                style={{
                  backgroundColor: isActiveTask(status) ? "#FF3333  " : "",
                  color: isActiveTask(status) ? "white" : "primary",
                }}
              >
                <ListItemText primary={"ביטול סיוע"} />
                <ListItemIcon sx={{minWidth: '0', color: 'white'}}>
                  <CancelIcon />
                </ListItemIcon>
              </ListItemButton>
            </List>
          </DialogContent>
        </Dialog>
      </div>
      <Snackbar
        open={snackbarSuccessOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarSuccessClose}
        message="הבקשה נמחקה בהצלחה"
      />
      <Snackbar
        open={snackbarErrorOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarErrorClose}
        message="לא ניתן למחוק את הבקשה מכיוון שהסטטוס אינו נסגר"
      />      
    </>
  );
};

export default TableActionsDialog;

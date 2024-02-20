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
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CancelIcon from "@mui/icons-material/Cancel";
import VolLocationDialog from './VolLocationDialog.jsx'
import '../styles/RequestsPage.css';

const TableActionsDialog = ({
  uid,
  handleDeleteRequest,
  isActiveTask,
  status,
  volLocation
}) => {
  const [tableActionsDialogState, setTableActionsDialogState] = useState(false);

  const handleTableActionsDialogClose = () => {
    setTableActionsDialogState(false)
  }

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
    </>
  );
};

export default TableActionsDialog;
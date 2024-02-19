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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import CancelIcon from "@mui/icons-material/Cancel";

const TableActionsDialog = ({
  uid,
  handleDeleteRequest,
  isActiveTask,
  status,
}) => {
  const [tableActionsDialogState, setTableActionsDialogState] = useState(false);

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
        <Dialog open={tableActionsDialogState}>
          <DialogTitle>פעולות נוספות</DialogTitle>
          <DialogContent>
            <List className="openTask-task-list">
              <ListItemButton
                onClick={() => {
                  console.log("Clicked on location");
                }}
              >
                <ListItemText primary={"מיקום מתנדב"} />
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
              </ListItemButton>

              <ListItemButton
                onClick={() => handleDeleteRequest(uid)}
                disabled={!isActiveTask(status)}
                style={{
                  backgroundColor: isActiveTask(status) ? "#FF3333  " : "",
                  color: isActiveTask(status) ? "white" : "primary",
                }}
              >
                <ListItemText primary={"ביטול סיוע"} />
                <ListItemIcon>
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

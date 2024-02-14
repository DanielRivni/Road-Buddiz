import React from "react";
import {
  Dialog,
  AppBar,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { assignRequest, cancelRequestAssignment } from "../middleware/firestore/requests";

const VolunteerTasksDialog = ({ task, isOpen, onClose, onStatusChange, volUid }) => {
  const handleStatusChange = (newStatus) => {
    onStatusChange(task.id, newStatus);
  };

  const handleChooseTask = async () => {
    handleStatusChange("בטיפול");
    await assignRequest(task.id, volUid);
    onClose();
  };

  const handleUnchooseTask = async () => {
    handleStatusChange("מחכה לסיוע");
    await cancelRequestAssignment(task.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <AppBar position="sticky">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px",
          }}
        >
          <Typography variant="h6">{task?.name}</Typography>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </AppBar>
      <Box p={3} textAlign="center">
        <Typography>סטטוס: {task?.status}</Typography>
        <Typography>מרחק: {task?.distance} ק"מ</Typography>
        <Box
          sx={{
            display: "flex",
            marginTop: "36px",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleChooseTask}
          >
            בחר סיוע
          </Button>
          <Button
            variant="contained"
            color="inherit"
            onClick={handleUnchooseTask}
          >
            בטל סיוע
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default VolunteerTasksDialog;

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

const VolunteerTasksDialog = ({ task, isOpen, onClose, onStatusChange }) => {
  const handleStatusChange = (newStatus) => {
    onStatusChange(task.id, newStatus);
  };

  const handleChooseTask = () => {
    handleStatusChange("בטיפול");
    onClose(); // Close the dialog after choosing the task
  };

  const handleUnchooseTask = () => {
    handleStatusChange("מחכה לסיוע");
    onClose(); // Close the dialog after unchoosing the task
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
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
      <Box p={3}>
        <Typography>סטטוס: {task?.status}</Typography>
        <Typography>מרחק: {task?.distance} ק"מ</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            marginTop: "36px",
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
            sx={{ marginLeft: 2 }} // Add some margin between the buttons
          >
            בטל סיוע
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default VolunteerTasksDialog;

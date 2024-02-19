import React, { useEffect, useState } from "react";
import {
  Dialog,
  AppBar,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  assignRequest,
  cancelRequestAssignment,
} from "../middleware/firestore/requests";
import { getAuth } from "firebase/auth";
import { readFirestoreDocument } from "../middleware/firestore";

const VolunteerTasksDialog = ({ task, isOpen, onClose, onStatusChange }) => {
  const [taskDetails, setTaskDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      if (task) {
        const taskData = await readFirestoreDocument("requests", task.id);
        setTaskDetails(taskData);

        const userData = await readFirestoreDocument("users", taskData.clientUid); 
        setUserDetails(userData);
      }
    };

    if (isOpen) {
      fetchTaskDetails();
    }
  }, [isOpen, task]);

  const handleStatusChange = (newStatus) => {
    onStatusChange(task.id, newStatus);
  };

  const handleChooseTask = async () => {
    const volUid = getAuth().currentUser.uid;
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
          <Typography variant="h6">{taskDetails?.name}</Typography>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </AppBar>
      <Box p={3} textAlign="center">
        <Typography>סטטוס: {taskDetails?.status}</Typography>
        <Typography>מרחק: {task?.distance} ק"מ</Typography>
        <Typography>שם הלקוח: {userDetails?.firstName} {userDetails?.lastName}</Typography>{" "}
        <Typography>טלפון: {userDetails?.phoneNumber}</Typography>{" "}
        <Typography>תיאור: {taskDetails?.description}</Typography>
        <Typography>פירוט נוסף: {taskDetails?.extraDetails}</Typography>
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

import React, { useEffect, useState } from "react";
import {
  Dialog,
  AppBar,
  Typography,
  Box,
  IconButton,
  Button,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from '@mui/material/Alert';
import {
  assignRequest,
  cancelRequestAssignment,
} from "../middleware/firestore/requests";
import { getAuth } from "firebase/auth";
import { readFirestoreDocument } from "../middleware/firestore";
import CloseTaskDialog from "../components/CloseTaskDialog";


const VolunteerTasksDialog = ({ task, isOpen, onClose, onStatusChange }) => {
  const [taskDetails, setTaskDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showCloseDialog, setShowCloseDialog] = useState(false); 

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
    
    if (taskDetails.status !== "מחכה לסיוע") {
      setSnackbarOpen(true);
      setSnackbarMessage("המשימה כבר נבחרה ע\"י מתנדב אחר");
      return;
    }
    
    handleStatusChange("בטיפול");
    await assignRequest(task.id, volUid);
    onClose();
  };

  const handleUnchooseTask = async () => {
    const currentUser = getAuth().currentUser;
    const volUid = currentUser ? currentUser.uid : null;
    if (!taskDetails || (taskDetails && taskDetails.volUid !== volUid)) {
      setSnackbarOpen(true);
      setSnackbarMessage("אינך מורשה לבטל סיוע למשימה זו");
      return;
    }
  
    handleStatusChange("מחכה לסיוע");
    await cancelRequestAssignment(task.id);
    onClose();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleOpenCloseDialog = () => {
    setShowCloseDialog(true);
  };

  const handleCloseCloseDialog = (additionalInfo) => {
    setShowCloseDialog(false);
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
            justifyContent: "center",
            gap: "16px",
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
          {taskDetails && taskDetails.volUid === getAuth().currentUser.uid && (
            <Button
              variant="contained"
              style={{ backgroundColor: 'red', color: 'white' }}
              onClick={handleOpenCloseDialog}
            >
              סגור בקשה
            </Button>
          )}
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="warning"
          elevation={6}
          variant="filled"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      {showCloseDialog && (
        <CloseTaskDialog taskID={task.id} onCloseTask={handleCloseCloseDialog} />
      )}
    </Dialog>
  );
};

export default VolunteerTasksDialog;

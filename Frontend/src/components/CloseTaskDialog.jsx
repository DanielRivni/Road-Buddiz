import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { updateDocumentField } from "../middleware/firestore/index"; 

const CloseTaskDialog = ({ taskID, onCloseTask }) => {
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseTask = async () => {
    try {
      await updateDocumentField("requests", taskID, { status: "נסגר" });
      onCloseTask(additionalInfo); 
    } catch (error) {
      console.error("Error closing task:", error);
      setSnackbarOpen(true);
      setSnackbarMessage("אירעה שגיאה בעת סגירת הבקשה");
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCancel = () => {
    onCloseTask(null);
  };

  return (
    <div>
      <Dialog open={true} onClose={handleCancel}>
        <DialogTitle>סגירת בקשה</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="פרטים נוספים"
            fullWidth
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            בטל
          </Button>
          <Button onClick={handleCloseTask} color="primary">
            סגור בקשה
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity="error"
          elevation={6}
          variant="filled"
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default CloseTaskDialog;

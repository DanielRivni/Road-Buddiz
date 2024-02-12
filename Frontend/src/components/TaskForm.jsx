import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

function TaskForm({ selectedTask, onClose, onExit }) {
  const [taskDetails, setTaskDetails] = useState({
    description: "",
    additionalDetails: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting task details:", taskDetails);
    onClose();
  };

  const handleExit = () => {
    onExit(); // Call onExit function to close the dialog
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {selectedTask} {/* Display selectedTask as the dialog title */}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="description"
            label="תיאור התקלה"
            variant="outlined"
            fullWidth
            margin="normal"
            value={taskDetails.description}
            onChange={handleChange}
            required
          />
          <TextField
            name="additionalDetails"
            label="פרטים נוספים"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={taskDetails.additionalDetails}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">
            שלח
          </Button>
          <Button onClick={handleExit} variant="contained" color="secondary">
            יציאה
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default TaskForm;

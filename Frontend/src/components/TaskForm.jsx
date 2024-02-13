import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
} from "@mui/material";
import "../styles/TaskForm.css";

function TaskForm({ selectedTask, onClose, onExit }) {
  const [taskDetails, setTaskDetails] = useState({
    description: "",
    additionalDetails: "",
    image: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      image: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting task details:", taskDetails);
    onClose();
  };

  const handleExit = () => {
    onExit();
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {selectedTask}
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
          <Typography variant="h6" gutterBottom>
            צרף תמונה
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: "1rem" }}
          />
          {taskDetails.image && (
            <div className="task-form-container">
              <img
                src={taskDetails.image}
                alt="Selected"
                className="image-preview"
              />
            </div>
          )}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button onClick={handleExit} variant="contained" color="secondary">
              יציאה
            </Button>
            <Button type="submit" variant="contained" color="primary">
              שלח
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}

export default TaskForm;
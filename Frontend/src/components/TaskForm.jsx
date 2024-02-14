import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
} from "@mui/material";
import "../styles/TaskForm.css";

function TaskForm({ 
  selectedTask, taskDetails, onExit, onSubmit, 
  handleTextChange, handleImageChange }) {

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {selectedTask}
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            name="description"
            label="תיאור התקלה"
            variant="outlined"
            fullWidth
            margin="normal"
            value={taskDetails.description}
            onChange={handleTextChange}
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
            onChange={handleTextChange}
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
            <Button onClick={onExit} variant="contained" color="secondary">
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
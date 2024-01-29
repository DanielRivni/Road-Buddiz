import React, { useState } from "react";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import VolunteerChosenTasks from "./VolunteerChosenTasks";
const VolunteerTaskPage = () => {
  const [tasks, setTasks] = useState([
    createTask("Task 1", "Pending", 10),
    createTask("Task 2", "Pending", 5),
    createTask("Task 3", "Pending", 347),
    createTask("Task 4", "Pending", 5),
    createTask("Task 5", "Pending", 52),
    createTask("Task 6", "Pending", 435),
    // Add more tasks as needed
  ]);

  const [chosenTask, setChosenTask] = useState(null);
  const [isAscending, setIsAscending] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle task selection and open modal
  const handleTaskSelect = (task) => {
    setChosenTask(task);
    setIsModalOpen(true);
  };
  // Function to handle status change of the task
  const handleTaskStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  function createTask(name, status, distance) {
    return {
      id: Math.random().toString(36).slice(2, 11), // Generate a random ID
      name,
      status,
      distance,
    };
  }

  const sortTasksByDistance = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (isAscending) {
        return a.distance - b.distance;
      } else {
        return b.distance - a.distance;
      }
    });
    setTasks(sortedTasks);
    setIsAscending(!isAscending); // Toggle sorting order
  };

  return (
    <div className="task-selection-page">
      <div className="title-container">
        <Typography variant="h4" style={{ color: "#ffa70f" }}>
          בחירת משימות
        </Typography>
      </div>
      <div className="sort-button-container">
        <Button
          variant="contained"
          color="primary"
          onClick={sortTasksByDistance}
        >
          מיין לפי מרחק {isAscending ? "(הכי קרוב ראשון)" : "(הכי רחוק ראשון)"}
        </Button>
      </div>
      <div className="task-list">
        <Paper style={{ overflow: "auto" }}>
          <TableContainer>
            <Table aria-label="tasks table">
              <TableHead>
                <TableRow>
                  <TableCell>שם</TableCell>
                  <TableCell>סטטוס</TableCell>
                  <TableCell>מרחק (קמ)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow
                    key={task.id}
                    onClick={() => handleTaskSelect(task)}
                  >
                    <TableCell>{task.name}</TableCell>
                    <TableCell>{task.status}</TableCell>
                    <TableCell>{task.distance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
      <VolunteerChosenTasks
        chosenTask={chosenTask}
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
        handleTaskStatusChange={handleTaskStatusChange}
      />
    </div>
  );
};

export default VolunteerTaskPage;

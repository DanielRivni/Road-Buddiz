import "../styles/VolunteerTaskPage.css";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
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
import VolunteerTasksDialog from "../components/VolunteerTasksDialog";
import { VolunteerMenuList } from "../components/Menu";
const VolunteerTaskPage = () => {
  const [tasks, setTasks] = useState([
    createTask("Task 1", "בטיפול", 10),
    createTask("Task 2", "מחכה לסיוע", 5),
    createTask("Task 3", "מחכה לסיוע", 347),
    createTask("Task 4", "מחכה לסיוע", 5),
    createTask("Task 5", "בטיפול", 52),
    createTask("Task 6", "בטיפול", 435),
  ]);

  const [chosenTask, setChosenTask] = useState(null);
  const [isAscending, setIsAscending] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { uid } = useLocation().state;

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
      id: Math.random().toString(36).slice(2, 11),
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
      <div className="header-container">
        <Typography variant="h3">בחירת משימות</Typography>
        <VolunteerMenuList uid={uid} />
      </div>

      <div className="sort-button-container">
        <Button variant="contained" onClick={sortTasksByDistance}>
          מיין לפי מרחק
        </Button>
      </div>

      <div className="task-list">
        <Paper>
          <TableContainer>
            <Table>
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
                    onClick={() => handleTaskSelect(task)}
                    key={task.id}
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

      <VolunteerTasksDialog
        task={chosenTask}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onStatusChange={handleTaskStatusChange}
      />
    </div>
  );
};

export default VolunteerTaskPage;

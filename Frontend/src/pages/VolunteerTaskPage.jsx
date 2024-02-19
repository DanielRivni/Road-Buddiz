import "../styles/VolunteerTaskPage.css";
import React, { useState, useEffect } from "react";
import {
  Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper,
} from "@mui/material";
import VolunteerTasksDialog from "../components/VolunteerTasksDialog";
import { VolunteerMenuList } from "../components/Menu";
import { listenToAllRequests } from "../middleware/firestore/requests";

const VolunteerTaskPage = () => {
  const [tasks, setTasks] = useState([]);

  const [chosenTask, setChosenTask] = useState(null);
  const [isAscending, setIsAscending] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleRequests = async (requests) => {
      try {
        const updatedTasks = requests.map(({ id, data }) =>
          createTask(data.task, data.status, getRandomNumber(), id));
        setTasks(updatedTasks);
      } catch (error) {
        console.error("Error handling requests:", error);
        setError(error.message);
      }
    };


    const fetchData = async () => {
      try {
        await listenToAllRequests(handleRequests);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  function getRandomNumber() {
    return Math.floor(Math.random() * 1000) + 1;
  }

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

  function createTask(name, status, distance, id = Math.random().toString(36).slice(2, 11)) {
    return { id, name, status, distance, };
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
        <VolunteerMenuList />
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
                  <TableRow onClick={() => handleTaskSelect(task)} key={task.id}>
                    <TableCell >{task.name}</TableCell>
                    <TableCell >{task.status}</TableCell>
                    <TableCell >{task.distance}</TableCell>
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

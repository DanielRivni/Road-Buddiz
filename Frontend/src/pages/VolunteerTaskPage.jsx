import "../styles/VolunteerTaskPage.css";
import React, { useState, useEffect } from "react";
import {
  Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper,
} from "@mui/material";
import VolunteerTasksDialog from "../components/VolunteerTasksDialog";
import { VolunteerMenuList } from "../components/Menu";
import { listenToAllRequests, updateVolLocation } from "../middleware/firestore/requests";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WazeLogo from '../assets/waze-icon.png'
import { getDistance } from 'geolib';
import { getAuth } from 'firebase/auth';

const VolunteerTaskPage = () => {
  const [tasks, setTasks] = useState([]);

  const [chosenTask, setChosenTask] = useState(null);
  const [isAscending, setIsAscending] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');

  const locationSuccessCb = (currentLocation) => {
    setCurrentLocation(
      `${currentLocation.coords.latitude},${currentLocation.coords.longitude}`
    );
  };

  const locationFailedCb = (error) => {
    //debugger; // TODO: Throw Snack
    setCurrentLocation("");
  };

  useEffect(() => {
    (async() => {
      tasks.forEach(task => {
        if (task?.volUid === getAuth().currentUser.uid) {
          updateVolLocation(task.id,currentLocation);
        }
      })
    })()
  },[currentLocation])

  useEffect(() => {
    const handleRequests = async (requests) => {
      try {
        const updatedTasks = requests.map(({ id, data }) => ({id, name: data.task, status: data.status, location: data.locationString, volUid: data.volUid}));
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

    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        locationSuccessCb,
        locationFailedCb
      );
    }

    getLocation();
    setInterval(() => {
      getLocation();
    }, 2000)

    fetchData();
  }, []);

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

  const sortTasksByDistance = () => {
    const sortedTasks = [...tasks].map(task => ({
      ...task,
      distance: computeDistance(task) // Calculate distance for each task
    })).sort((a, b) => {
      if (isAscending) {
        return a.distance - b.distance;
      } else {
        return b.distance - a.distance;
      }
    });
    setTasks(sortedTasks);
    setIsAscending(!isAscending); // Toggle sorting order
  };

  const computeDistance = (task) => {
    if (!currentLocation || !task.location) return '-';
    const currentLocationArr = currentLocation.split(',');
    const taskLocationArr = task.location.split(',');
    const distance = getDistance(
        { latitude: currentLocationArr[0], longitude: currentLocationArr[1] },
        { latitude: taskLocationArr[0], longitude: taskLocationArr[1] }
    );
    return parseInt(distance / 1000);
  };

  return (
    <div className="task-selection-page">
      <div className="header-container">
        <Typography variant="h3">בחירת משימות</Typography>
        <div className="center">
          <div className="sort-button-container">
            <Button variant="contained" onClick={sortTasksByDistance}>
              מיין לפי מרחק
            </Button>
          </div>
          <VolunteerMenuList />
        </div>
      </div>


      <div className="task-list">
        <Paper>
          <TableContainer>
            <Table>
              <TableHead sx={{textAlign: 'center'}}>
                <TableRow>
                  <TableCell>שם</TableCell>
                  <TableCell>סטטוס</TableCell>
                  <TableCell>מיקום</TableCell>
                  <TableCell>מרחק</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tasks.map((task) => (
                  <TableRow onClick={() => handleTaskSelect(task)} key={task.id}>
                    <TableCell >{task.name}</TableCell>
                    <TableCell >{task.status}</TableCell>
                    <TableCell sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '1em'}}>
                      <a href={`https://www.google.com/maps/place/${task.location}`} target="_blank" rel="noopener noreferrer">
                        <LocationOnIcon/>
                      </a>
                      <a href={`https://waze.com/ul?ll=${task.location}&z=10`} target="_blank" rel="noopener noreferrer">
                        <img src={WazeLogo} alt="waze-icon" className="waze-logo"/>
                      </a>
                    </TableCell>
                    <TableCell >{computeDistance(task)}</TableCell>
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
        location = {currentLocation}
      />
    </div>
  );
};

export default VolunteerTaskPage;

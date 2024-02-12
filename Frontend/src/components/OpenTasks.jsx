import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import { LocalGasStation, TireRepair, Cable } from "@mui/icons-material";
import "../styles/OpenTaskPage.css";
import TaskForm from "../components/TaskForm";

const OpenTaskPage = () => {
  const [chooseTaskDialogOpen, setChooseTaskDialogOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [formDialogOpen, setFormDialogOpen] = React.useState(false);

  const handleChooseTaskDialogOpen = () => {
    setChooseTaskDialogOpen(true);
  };

  const handleChooseTaskDialogClose = () => {
    setChooseTaskDialogOpen(false);
  };

  const handleFormDialogOpen = () => {
    setFormDialogOpen(true);
    handleChooseTaskDialogClose(); // Close the choose task dialog when opening form dialog
  };

  const handleFormDialogClose = () => {
    setFormDialogOpen(false);
  };

  const handleTaskSelection = (task) => {
    setSelectedTask(task);
    handleFormDialogOpen(); // Open the form dialog after task selection
  };

  const handleExit = () => {
    setSelectedTask(null); // Reset selected task
    handleFormDialogClose(); // Close the form dialog
  };

  return (
    <>
      <div>
        <Button
          variant="contained"
          id="open-new-request-button"
          onClick={handleChooseTaskDialogOpen}
        >
          פתיחת תקלה
        </Button>
        <Dialog
          open={chooseTaskDialogOpen}
          onClose={handleChooseTaskDialogClose}
        >
          <DialogTitle>בחר תקלה</DialogTitle>
          <DialogContent>
            <List>
              <ListItem button onClick={() => handleTaskSelection("שירות דלק")}>
                <ListItemIcon>
                  <LocalGasStation />
                </ListItemIcon>
                <ListItemText primary="שירות דלק" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleTaskSelection("החלפת צמיג")}
              >
                <ListItemIcon>
                  <TireRepair />
                </ListItemIcon>
                <ListItemText primary="החלפת צמיג" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleTaskSelection("טעינת/החלפת מצבר")}
              >
                <ListItemIcon>
                  <Cable />
                </ListItemIcon>
                <ListItemText primary="טעינת/החלפת מצבר" />
              </ListItem>
            </List>
          </DialogContent>
        </Dialog>
      </div>
      {selectedTask && (
        <TaskForm
          selectedTask={selectedTask}
          onClose={handleFormDialogClose}
          onExit={handleExit}
        />
      )}
    </>
  );
};

export default OpenTaskPage;

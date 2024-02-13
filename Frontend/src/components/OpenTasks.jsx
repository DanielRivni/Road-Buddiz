import React from "react";
import {
  Dialog, DialogTitle, DialogContent, List, ListItemButton, ListItemIcon, ListItemText,
  Button, Typography
} from "@mui/material";
import { LocalGasStation, TireRepair, Cable } from "@mui/icons-material";
import "../styles/OpenTaskPage.css";
import TaskForm from "./TaskForm";
import StepByStepGuide from "./IssueGuide";
import OpenTaskHook from "../hooks/OpenTaskStates";

const OpenTaskPage = () => {
  const { ...rest } = OpenTaskHook();

  return (
    <>
      <div>
        <Button
          variant="contained"
          id="open-new-request-button"
          onClick={rest.handleChooseTaskDialogOpen}
        >
          פתיחת תקלה
        </Button>
        <Dialog
          open={rest.taskState.chooseTaskDialogOpen}
          onClose={rest.handleChooseTaskDialogClose}
        >
          <DialogTitle>בחר תקלה</DialogTitle>
          <DialogContent>
            <List>
              <ListItemButton onClick={() => rest.handleTaskSelection("שירות דלק")}>

                <ListItemIcon>
                  <LocalGasStation />
                </ListItemIcon>
                <ListItemText primary="שירות דלק" />
              </ListItemButton>

              <ListItemButton onClick={() => rest.handleTaskSelection("החלפת צמיג")}>

                <ListItemIcon>
                  <TireRepair />
                </ListItemIcon>
                <ListItemText primary="החלפת צמיג" />
              </ListItemButton>

              <ListItemButton onClick={() => rest.handleTaskSelection("טעינת/החלפת מצבר")}>

                <ListItemIcon>
                  <Cable />
                </ListItemIcon>
                <ListItemText primary="טעינת/החלפת מצבר" />

              </ListItemButton>
            </List>
            <Typography variant="body1" id="contact-us-text">
              אם התקלה שלך אינה מופיעה, אנא צור קשר עם מוקד הטלפוני במספר 00000 לקבלת עזרה אישית.
            </Typography>
          </DialogContent>
        </Dialog>
      </div>
      {rest.taskState.selectedTask && (
        <>
          {rest.taskState.guideOpen && (
            <div id='issue-guide'>
              <StepByStepGuide
                selectedTask={rest.taskState.selectedTask}
                onContinue={rest.handleGuideContinue}
                onExit={rest.handleGuideExit}
              />
            </div>
          )}
          {rest.taskState.formDialogOpen && (
            <div id='task-form'>
              <TaskForm
                selectedTask={rest.taskState.selectedTask}
                onClose={rest.handleFormDialogClose}
                onExit={rest.handleExit}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default OpenTaskPage;

import React, { useState } from "react";
import {
  Dialog,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const VolunteerChosenTasks = ({
  chosenTask,
  isOpen,
  handleClose,
  handleTaskStatusChange,
}) => {
  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleStatusChange = (newStatus) => {
    handleTaskStatusChange(chosenTask.id, newStatus);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
      <AppBar position="sticky">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px",
          }}
        >
          <Tabs value={tabValue} onChange={handleChangeTab}>
            <Tab label="Task Details" />
            {/* Add more tabs here for additional features */}
          </Tabs>
          <IconButton onClick={handleClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h6">{chosenTask?.name}</Typography>
        <Typography>Status: {chosenTask?.status}</Typography>
        <Typography>Distance: {chosenTask?.distance}</Typography>
        {/* Add any other task details you want to display */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "16px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleStatusChange("Active")}
          >
            בחר סיוע
          </Button>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => handleStatusChange("Pending")}
          >
            בטל סיוע
          </Button>
        </Box>
      </TabPanel>
      {/* Add more TabPanels for additional features */}
    </Dialog>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default VolunteerChosenTasks;

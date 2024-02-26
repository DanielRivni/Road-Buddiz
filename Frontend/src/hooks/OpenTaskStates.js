import React, { useState } from 'react';
import { GetGuide, uploadRequest } from '../middleware/firestore/requests';
import { getAuth } from 'firebase/auth';
import StepByStepGuide from '../components/IssueGuide.jsx'
const OpenTaskHook = () => {
  const [taskState, setTaskState] = useState({
    selectedTask: null,
    dialogOpen: false,
    chooseTask: false,
    formDialogOpen: false,
    guideOpen: false
  });

  const [guideSteps, setGuideSteps] = useState([]);
  const [video_url, setVideoUrl] = useState(""); // Updated state name

  const handleDialogOpen = () => {
    setTaskState({
      ...taskState,
      dialogOpen: true,
      chooseTask: true
    });
  };

  const handleTaskSelection = async (task) => {
    setTaskState({
      ...taskState,
      selectedTask: task,
      guideOpen: true,
      chooseTask: false
    });
    const { steps, video_url } = await GetGuide(task);
    if (!steps || steps.length === 0) {
      console.log("No guide found for task: ", task);
      return;
    }
    setGuideSteps(steps);
    setVideoUrl(video_url);
  };

  const handleGuideContinue = () => {
    setTaskState({
      ...taskState,
      guideOpen: false,
      formDialogOpen: true
    });
  };

  const [taskDetails, setTaskDetails] = useState({
    description: "",
    additionalDetails: "",
    image: null,
    locationString: ''
  });

  const handleFormTextChange = (event) => {
    const { name, value } = event.target;
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFormImageChange = (event) => {
    const file = event.target.files[0];
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      image: URL.createObjectURL(file),
    }));
  };

  const handleFormLocationChange = (locationString) => {
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      locationString
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { description, additionalDetails, image, locationString } = taskDetails;
    const auth = getAuth();
    await uploadRequest(auth.currentUser.uid, description, additionalDetails, taskState.selectedTask, locationString);
    handleDialogExit();
  };

  const handleDialogExit = () => {
    setTaskState({
      selectedTask: null,
      dialogOpen: false,
      chooseTask: false,
      formDialogOpen: false,
      guideOpen: false
    });
    setTaskDetails({
      description: "",
      additionalDetails: "",
      image: null,
      locationString: ""
    });
    setGuideSteps([]);
    setVideoUrl(""); // Clear video URL
  };

  return {
    taskState,
    guideSteps,
    video_url,
    taskDetails,
    handleFormTextChange,
    handleFormImageChange,
    handleFormLocationChange,
    handleFormSubmit,
    handleDialogOpen,
    handleTaskSelection,
    handleDialogExit,
    handleGuideContinue
  };
};

export default OpenTaskHook;
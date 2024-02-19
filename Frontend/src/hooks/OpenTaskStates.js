import { useState } from 'react';
import { GetGuide, uploadRequest } from '../middleware/firestore/requests';
import { getAuth } from 'firebase/auth';

const OpenTaskHook = () => {
  // Dialog States
  const [taskState, setTaskState] = useState({
    selectedTask: null,
    dialogOpen: false,
    chooseTask: false,
    formDialogOpen: false,
    guideOpen: false
  });

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
    const steps = await GetGuide(task);
    if (steps.length === 0) {
      print("No guide found for task: ", task);
      return;
    }
    setGuideSteps(steps);
  };

  // Guide States
  const [guideSteps, setGuideSteps] = useState([])

  const handleGuideContinue = () => {
    setTaskState({
      ...taskState,
      guideOpen: false,
      formDialogOpen: true
    });
  };

  // Form States
  const [taskDetails, setTaskDetails] = useState({
    description: "",
    additionalDetails: "",
    image: null,
    locationString:''
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
    const auth = getAuth();
    event.preventDefault();
    const { description, additionalDetails, image, locationString } = taskDetails;
    await uploadRequest(auth.currentUser.uid, description, additionalDetails, taskState.selectedTask, locationString);
    handleExit();
  };

  // Exit
  const handleDialogExit = () => {
    setTaskState({
      ...taskState,
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
    });
  };

  return {
    taskState,
    guideSteps,
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
}

export default OpenTaskHook;

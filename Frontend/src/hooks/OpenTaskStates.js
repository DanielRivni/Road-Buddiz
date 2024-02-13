import { useState } from 'react';

const OpenTaskHook = () => {
const [taskState, setTaskState] = useState({
    selectedTask: null,
    chooseTaskDialogOpen: false,
    formDialogOpen: false,
    guideOpen: false
  });

  const handleChooseTaskDialogOpen = () => {
    setTaskState({ ...taskState, chooseTaskDialogOpen: true });
  };

  const handleChooseTaskDialogClose = () => {
    setTaskState({ ...taskState, chooseTaskDialogOpen: false });
  };

  const handleFormDialogClose = () => {
    setTaskState({ ...taskState, formDialogOpen: false });
  };

  const handleTaskSelection = (task) => {
    setTaskState({
      ...taskState,
      selectedTask: task,
      guideOpen: true,
      chooseTaskDialogOpen: false
    });
  };

  const handleExit = () => {
    setTaskState({
      ...taskState,
      selectedTask: null,
      formDialogOpen: false
    });
  };

  const handleGuideExit = () => {
    setTaskState({ ...taskState, guideOpen: false });
    handleExit();
  };

  const handleGuideContinue = () => {
    setTaskState({ ...taskState, guideOpen: false, formDialogOpen: true });
  };

    return {
        taskState,
        handleChooseTaskDialogOpen,
        handleChooseTaskDialogClose,
        handleTaskSelection,
        handleFormDialogClose,
        handleExit,
        handleGuideExit,
        handleGuideContinue
    };
}

export default OpenTaskHook;
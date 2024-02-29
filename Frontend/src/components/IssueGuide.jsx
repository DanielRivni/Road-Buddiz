import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Modal,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const StepByStepGuide = ({
  steps,
  video_url,
  selectedTask,
  onContinue,
  onExit,
}) => {
  const [openVideo, setOpenVideo] = useState(false);

  const handlePrint = (event) => {
    event.preventDefault();
  };

  const handleOpenVideo = () => {
    setOpenVideo(true);
  };

  const handleCloseVideo = () => {
    setOpenVideo(false);
  };

  return (
    <Card style={{ maxHeight: "90vh", overflow: "auto" }}>
      <CardContent style={{ fontFamily: "Comic Sans MS" }}>
        <Typography variant="h4" align="center" gutterBottom>
          מדריך: {selectedTask}
        </Typography>
        {steps.length > 0 ? (
          <Box style={{ textAlign: "right" }}>
            {steps.map((step, index) => (
              <Typography
                variant="body1"
                key={index}
                paragraph
                style={{ marginBottom: "4px" }}
              >
                <b>שלב {index + 1}:</b> {step}
              </Typography>
            ))}
          </Box>
        ) : (
          <Typography variant="body1">לא נמצאו שלבים.</Typography>
        )}
      </CardContent>
      <Modal open={openVideo} onClose={handleCloseVideo} maxWidth="md">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
          }}
        >
          {video_url && (
            <iframe
              width="100%"
              height="100%"
              src={video_url}
              title="Task Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </Box>
      </Modal>
      <div style={{ display: "none" }}>
        <Button id="printButton" onClick={handlePrint} />
      </div>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="row"
        margin={1}
      >
        <Button
        type="button"
        onClick={onExit}
        variant="contained"
        color="secondary"
        style={{ width: '25%', textAlign: 'center' }}
      >
        יציאה
      </Button>
      <Button
        onClick={handleOpenVideo}
        variant="contained"
        color="primary"
        style={{
          width: '25%',
          backgroundColor: '#0000CC',
          textAlign: 'center',
        }}
        startIcon={<PlayArrowIcon />}
      >
        לצפיה בסרטון
      </Button>
      <Button
        type="button"
        onClick={onContinue}
        variant="contained"
        color="primary"
        style={{ width: '25%', textAlign: 'center' }}
      >
        המשך לפתיחת התקלה
      </Button>
      </Box>
    </Card>
  );
};

export default StepByStepGuide;

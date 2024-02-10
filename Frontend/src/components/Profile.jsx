import React, { useEffect, useState, useRef } from 'react';
import { Typography, Button, Fab, Box, Avatar } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteConfirmation = ({ confirmDelete, closeDeleteConfirmation }) => {

  useEffect(() => {
    // Scroll to the bottom of the page when appears
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, []);


  return (
    <div className="delete-confirmation">
      <Typography id="message" variant="body1" marginBottom={2}>
        האם את/ה בטוח/ה שברצונך למחוק את החשבון שלך?
      </Typography>
      <div className="buttons">
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ backgroundColor: 'red', color: 'white' }}
          onClick={confirmDelete}
        >
          מחק
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={closeDeleteConfirmation}
        >
          בטל
        </Button>
      </div>
    </div>
  );
};

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

const getAvatarStyle = (fullName) => ({ bgcolor: stringToColor(fullName) });

const ProfileEditButtons = ({ handleSaveClick, handleCancelClick, errors }) => {

  const [buttonStyle, setButtonStyle] = useState({
    backgroundColor: '',
    color: 'primary',
  });

  const anyErrors = Object.values(errors).some(error => error);

  useEffect(() => {
    // Update styles when anyErrors changes
    setButtonStyle({
      backgroundColor: anyErrors ? 'gray' : '',
      color: anyErrors ? 'white' : 'primary',
    });
  }, [anyErrors]);

  return (

    <div style={{ display: 'flex', flexDirection: 'row', gap: '50px' }}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleSaveClick}
        style={buttonStyle}
        disabled={anyErrors}>
        שמור
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleCancelClick}>
        בטל
      </Button>
    </div>
  );
};

const AccountEditButtons = ({ handleSaveClick, handleCancelClick, errors }) => {

  const [buttonStyle, setButtonStyle] = useState({
    backgroundColor: '',
    color: 'primary',
  });

  const anyErrors = Object.values(errors).some(error => error);

  useEffect(() => {
    // Scroll to the bottom of the page when the component appears
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });

  }, []);

  useEffect(() => {
    // Update styles when anyErrors changes
    setButtonStyle({
      backgroundColor: anyErrors ? 'gray' : '',
      color: anyErrors ? 'white' : 'primary',
    });
  }, [anyErrors]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '50px' }}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleSaveClick}
        style={buttonStyle}
        disabled={anyErrors}>
        שמור
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleCancelClick}
      >
        בטל
      </Button>
    </div>
  );
};

const UploadAvatar = ({ firstname, lastname, file, handleFileChange, handleImageRemove, editingProfile }) => {
  const fullName = `${firstname} ${lastname}`;
  const inputFileRef = useRef(null);

  const handleFabClick = (event) => {
    // Check if the click event target is the Fab button with the CameraAltIcon
    if (event.currentTarget.contains(event.target)) {
      // Trigger the input box when Fab button is clicked
      inputFileRef.current.click();
    }
  };


  return (
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      {file ? (
        // If file is not null, render Avatar with the image
        <Avatar id="profile-avatar" src={file} />
      ) : (
        // If file is null, render Avatar with initials
        <Avatar id="profile-avatar" sx={getAvatarStyle(fullName)}>
          <span style={{ fontSize: '50px' }}>{firstname.charAt(0).toUpperCase()}</span>
          <span style={{ fontSize: '50px' }}>{lastname.charAt(0).toUpperCase()}</span>
        </Avatar>
      )}
      {editingProfile && (
        <>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            ref={inputFileRef}
          />
          <Fab
            size="small"
            color="default"
            aria-label="upload-avatar"
            onClick={(event) => handleFabClick(event)}
            sx={{ position: 'absolute', bottom: '20px', right: '-5px' }}
          >
            <CameraAltIcon />
          </Fab>
          <Fab
            size="small"
            color="default"
            aria-label="upload-avatar"
            onClick={handleImageRemove}
            sx={{ position: 'absolute', bottom: '20px', right: '115px' }}
          >
            <DeleteIcon />
          </Fab>
        </>
      )}
    </Box>
  );
};

const EditProfileButton = ({ onClick }) => (
  <Button
    variant="contained"
    color="primary"
    size="small"
    onClick={onClick}
  >
    <EditIcon style={{ fontSize: 20 }} />
    ערוך פרופיל
  </Button>
);

const EditAccountButton = ({ onClick }) => (
  <Button
    variant="contained"
    color="primary"
    size="small"
    onClick={onClick}
  >
    <EditIcon style={{ fontSize: 20 }} />
    ערוך חשבון
  </Button>
);

const DeleteButton = ({ onClick }) => (
  <Button
    variant="contained"
    color="primary"
    size="small"
    onClick={onClick}
  >
    <DeleteIcon style={{ fontSize: 20 }} />
    מחק חשבון
  </Button>
);

export {
  DeleteConfirmation,
  stringToColor,
  getAvatarStyle,
  EditProfileButton,
  EditAccountButton,
  ProfileEditButtons,
  AccountEditButtons,
  DeleteButton,
  UploadAvatar,
};
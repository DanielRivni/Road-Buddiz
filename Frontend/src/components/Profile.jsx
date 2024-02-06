import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
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
};
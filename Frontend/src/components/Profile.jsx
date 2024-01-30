import React, { useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';

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
      <Typography id="message" variant="body1">
        האם את/ה בטוח/ה שברצונך למחוק את החשבון שלך?
      </Typography>
      <div className="buttons">
        <Button
          style={{ color: 'red' }}
          onClick={confirmDelete}
        >
          מחק
        </Button>
        <Button
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


const EditButtons = ({ handleSaveClick, handleCancelClick, scrollToBottom = false}) => {
  // Conditionally apply useEffect based on scrollToBottom value
  useEffect(() => {
    if (scrollToBottom) {
      // Scroll to the bottom of the page when the component appears
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [scrollToBottom]); // Include scrollToBottom in the dependency array

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '50px' }}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleSaveClick}>
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

const LogoutButton = () => (
  <Button
    variant="contained"
    color="primary"
    size="small"
  >
    <LogoutIcon style={{ fontSize: 20 }} />
    התנתק
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
  EditButtons,
  EditProfileButton,
  EditAccountButton,
  LogoutButton,
  DeleteButton,
};
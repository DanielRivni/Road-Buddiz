import React, { useState } from 'react';
import { Card, CardContent, Typography, Avatar, CardActions, Button, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import useProfileLogic from '../hooks/useProfileLogic';
import "../styles/ClientProfile.css";

const Profile = () => {

  const { ...rest } = useProfileLogic();

  const DeleteConfirmation = ({ confirmDelete, closeDeleteConfirmation }) => (
    <div className="delete-confirmation">
      <Typography variant="body1">
        האם את/ה בטוח/ה שברצונך למחוק את החשבון שלך?
      </Typography>
      <Button
        className="delete-account-button"
        style={{ color: 'red' }}
        onClick={confirmDelete}
      >
        מחק
      </Button>
      <Button onClick={closeDeleteConfirmation}>
        בטל
      </Button>
    </div>
  );

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const confirmDelete = () => {
    // Implement your delete logic here
    // ...
    // After successful deletion, you can close the confirmation window
    closeDeleteConfirmation();
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };


  const EditButtons = ({ handleSaveClick, handleCancelClick }) => (
    <div>
      <Button size="small" onClick={handleSaveClick}>
        שמור
      </Button>
      <Button size="small" onClick={handleCancelClick}>
        בטל
      </Button>
    </div>
  );

  const DefaultButtons = () => (
    <>
      <Button
        startIcon={<EditIcon />}
        size="small"
        onClick={rest.handleEditClick}
        style={{ marginLeft: '20px' }}
      >
        ערוך פרופיל
      </Button>
    </>
  );

  const EditAccountDetailsButton = () => (
    <Button
      startIcon={<EditIcon />}
      size="small"
      onClick={rest.handleEditAccountClick}
      style={{ marginLeft: '20px' }}
    >
      ערוך פרטים
    </Button>
  );

  const LogoutButton = () => (
    <Button
      startIcon={<LogoutIcon />}
      size="small"
      style={{ marginLeft: '20px' }}
    >
      {logoutString}
    </Button>
  );

  const DeleteButton = ({ onClick }) => (
    <Button
      startIcon={<DeleteIcon />}
      size="small"
      style={{ marginLeft: '20px' }}
      onClick={onClick}
    >
      מחק חשבון
    </Button>
  );

  const logoutString = "\u200B התנתק";
  const fullName = `${rest.firstname} ${rest.lastname}`;

  return (
    <div className="profile-container" style={{ overflowY: 'auto' }}>
      {/* Profile Content */}
      <Card className="profile-card" >
        <CardContent>
          <Avatar
            className="profile-avatar"
            alt="Profile Picture"
            src="/images/profile.jpg"
            sx={{ width: 150, height: 150 }}
          />
          {rest.editingProfile ? (
            <div>
              <div>
                <input
                  type="text"
                  placeholder="שם פרטי"
                  value={rest.editedFirstname}
                  onChange={(e) => rest.setEditedFirstname(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="שם משפחה"
                  value={rest.editedLastname}
                  onChange={(e) => rest.setEditedLastname(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="מס' טלפון"
                  value={rest.editedPhone}
                  onChange={(e) => rest.setEditedPhone(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div>
              <Typography variant="h4" component="div" gutterBottom style={{ fontWeight: 'bold', textAlign: 'center' }}>
                {fullName}
              </Typography>
              <Typography variant="h5" component="div" gutterBottom >
                טלפון: {rest.phone}
              </Typography>
            </div>
          )}
        </CardContent>

        {/* Buttons */}
        <CardActions>
          {rest.editingProfile && <EditButtons handleSaveClick={rest.handleSaveClick} handleCancelClick={rest.handleCancelClick} />}
          {!rest.editingProfile && <DefaultButtons />}
        </CardActions>
        
        {/* Account Content */}
        <CardContent className='account-details' style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h4" component="div" gutterBottom style={{ fontWeight: 'bold', textAlign: 'center' }}>
            פרטי חשבון
          </Typography>
          {rest.editingAccount ? (
            <div>
              <div>
                <input
                  type="email"
                  placeholder="אימייל"
                  value={rest.editedUsername}
                  onChange={(e) => rest.setEditedUsername(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="סיסמה"
                  value={rest.editedPassword}
                  onChange={(e) => rest.setEditedPassword(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div>
              <Typography variant="h5" component="div" gutterBottom>
                אימייל: {rest.username}
              </Typography>
              <Typography variant="h5" component="div" gutterBottom>
                סיסמה: {'*'.repeat(rest.password.length)}
              </Typography>

            </div>
          )}
        </CardContent>

        {/* Buttons */}
        <CardActions>
          {!rest.editingAccount && <EditAccountDetailsButton />}
          {rest.editingAccount && <EditButtons handleSaveClick={rest.handleSaveAccountClick} handleCancelClick={rest.handleCancelAccountClick} />}
          {<LogoutButton />}
          {!showDeleteConfirmation && <DeleteButton onClick={() => setShowDeleteConfirmation(true)} />}
          {showDeleteConfirmation && <DeleteConfirmation confirmDelete={confirmDelete} closeDeleteConfirmation={closeDeleteConfirmation} />}
        </CardActions>
      </Card >
    </div >
  );
}

export default Profile;

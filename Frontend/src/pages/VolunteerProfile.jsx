import React, { useEffect} from 'react';
import { Card, CardContent, Typography, Avatar, CardActions, TextField, Box } from '@mui/material';
import { DeleteConfirmation, getAvatarStyle, EditProfileButton, EditAccountButton, ProfileEditButtons, 
  AccountEditButtons, LogoutButton, DeleteButton } from "../components/Profile";
import { VolunteerMenuList } from '../components/menu';
import { useLocation } from 'react-router-dom';
import { readFirestoreDocument } from "../middleware/firestore";
import profileHook from '../hooks/profileStates.js';
import "../styles/Profile.css";

const VolunteerProfile  = () => {
  const uid = useLocation().state.id;
  const collection = "users";
  const shouldRenderButtons = () => !rest.editingAccount && !rest.deleteConfirmation;
  const { ...rest } = profileHook();
  const accountErrors = {email: rest.emailError}
  const fullName = `${rest.firstname} ${rest.lastname}`;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocument = await readFirestoreDocument(collection, uid);
        if (!userDocument) {
          console.log("User not found!");
          return;
        }

        const { firstName, lastName, phoneNumber, email } = userDocument;

        if (firstName === undefined | lastName === undefined | phoneNumber === undefined | email === undefined) {
          console.error("User data is missing fields or incorrect named fields");
          return;
        }

        rest.initProfile(firstName, lastName, phoneNumber, email);

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [uid]);

  return (
    <>
      {/* Title */}
      <div className="title-container">
        <h1 id="title" style={{ color: "#ffa70f" }}>
          פרופיל מתנדב
        </h1>
        <VolunteerMenuList />
      </div>

      {/* Page Content */}
      <div className="cards-container">
        <Card className="profile-card" style = {{minHeight: '720px'}}>

          {/* Profile Content*/}
          <CardContent >
            <Avatar id="profile-avatar" sx={getAvatarStyle(fullName)}>
              <span style={{ fontSize: '50px' }}>{rest.firstname.charAt(0).toUpperCase()}</span>
              <span style={{ fontSize: '50px' }}>{rest.lastname.charAt(0).toUpperCase()}</span>
            </Avatar>
            {rest.editingProfile ? (
              <Box
                component="form"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',  // Set the direction to column
                  alignItems: 'center',     // Center horizontally
                  justifyContent: 'center', // Center vertically
                  '& > :not(style)': { m: 1, width: '30ch' },
                }}
              >
                <TextField
                  variant="outlined"
                  placeholder="שם פרטי"
                  value={rest.editedFirstname}
                  onChange={(e) => rest.setEditedFirstname(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  placeholder="שם משפחה"
                  value={rest.editedLastname}
                  onChange={(e) => rest.setEditedLastname(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  placeholder="מס' טלפון"
                  value={rest.editedPhone}
                  onChange={(e) => rest.setEditedPhone(e.target.value)}
                />

              </Box>
            ) : (
              <Box>
                <Typography variant="h4" component="div" gutterBottom style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  {fullName}
                </Typography>
                <Typography variant="h5" component="div" gutterBottom>
                  טלפון: {rest.phone}
                </Typography>
                <Typography variant="h5" component="div" gutterBottom>
                  תאריך הצטרפות: {new Date().toLocaleDateString()}
                </Typography>
                <Typography variant="h5" component="div" gutterBottom>
                  כמות סיועים:
                </Typography>
                <Typography variant="h5" component="div" gutterBottom >
                  מספר מתנדב:
                </Typography>
              </Box>
            )}
          </CardContent>

          {/* Buttons */}
          <CardActions>
            {rest.editingProfile && <ProfileEditButtons handleSaveClick={rest.handleSaveClick} handleCancelClick={rest.handleCancelClick} />}
            {!rest.editingProfile && <EditProfileButton onClick={rest.handleEditClick} />}
          </CardActions>

          {/* Account Content */}
          <CardContent className='account-details' style={{ display: 'flex', flexDirection: 'column' }}>
            {rest.editingAccount ? (
              <div>
                <div>
                  <TextField
                    error={rest.emailError}
                    helperText={rest.emailError ? "אימייל לא תקין" : ""}
                    variant="outlined"
                    placeholder="אימייל"
                    value={rest.editedUsername}
                    onChange={rest.handleUsernameChange}
                  ></TextField>
                </div>
                <div>
                  <TextField
                    variant="outlined"
                    placeholder="סיסמה"
                    value={rest.editedPassword}
                    onChange={(e) => rest.setEditedPassword(e.target.value)}
                  ></TextField>
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
            <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
              {shouldRenderButtons() && <EditAccountButton onClick={rest.handleEditAccountClick} />}
              {shouldRenderButtons() && <LogoutButton />}
              {shouldRenderButtons() && <DeleteButton onClick={() => rest.setDeleteConfirmation(true)} />}
            </div>
            {rest.editingAccount &&
              <AccountEditButtons
                handleSaveClick={rest.handleSaveAccountClick}
                handleCancelClick={rest.handleCancelAccountClick}
                errors={accountErrors} 
              />}
            {rest.deleteConfirmation && <DeleteConfirmation confirmDelete={rest.confirmDelete} closeDeleteConfirmation={rest.closeDeleteConfirmation} />}
          </CardActions>

        </Card >
      </div >
    </>
  );
}

export default VolunteerProfile;

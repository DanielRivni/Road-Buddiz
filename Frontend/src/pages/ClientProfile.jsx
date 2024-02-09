import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Avatar, CardActions, TextField, Box } from '@mui/material';
import { DeleteConfirmation, getAvatarStyle, EditProfileButton, EditAccountButton, ProfileEditButtons,
  AccountEditButtons, DeleteButton } from "../components/Profile";
import { ClientMenuList } from '../components/Menu';
import profileHook from '../hooks/profileStates.js';
import { useLocation } from 'react-router-dom';
import { readFirestoreDocument } from "../middleware/firestore";
import "../styles/Profile.css";

export default function ClientProfile() {
  const { uid } = useLocation().state;
  const { ...rest } = profileHook(uid);
  const shouldRenderButtons = () => !rest.editingAccount && !rest.deleteConfirmation;
  const accountErrors = { email: rest.emailError, password: rest.passwordError }
  const profileErrors = { firstname: rest.firstnameError, lastname: rest.lastnameError, phone: rest.phoneError }
  const fullName = `${rest.firstname} ${rest.lastname}`;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocument = await readFirestoreDocument("users", uid);
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
  }, []);

  return (
    <>
      {/* Title */}
      <div className="title-container">
        <h1 id="title" style={{ color: "#000000" }}>
          פרופיל לקוח
        </h1>
        <ClientMenuList uid={uid} />
      </div>

      {/* Page Content */}
      <div className="cards-container">
        <Card className="profile-card" style={{ minHeight: '610px' }}>

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
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '& > :not(style)': { m: 1, width: '30ch' },
                }}
              >
                <TextField
                  error={rest.firstnameError}
                  helperText={rest.firstnameError ? "שם פרטי לא תקין" : ""}
                  variant="outlined"
                  placeholder="שם פרטי"
                  value={rest.editedFirstname}
                  onChange={rest.handleFirstnameChange}
                />
                <TextField
                  error={rest.lastnameError}
                  helperText={rest.lastnameError ? "שם משפחה לא תקין" : ""}
                  variant="outlined"
                  placeholder="שם משפחה"
                  value={rest.editedLastname}
                  onChange={rest.handleLastnameChange}
                />
                <TextField
                  error={rest.phoneError}
                  helperText={rest.phoneError ? "אורך טלפון לא תקין" : ""}
                  variant="outlined"
                  placeholder="מס' טלפון"
                  value={rest.editedPhone}
                  onChange={rest.handlePhoneChange}
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
              </Box>
            )}
          </CardContent>

          {/* Buttons */}
          <CardActions>
            {rest.editingProfile &&
              <ProfileEditButtons
                handleSaveClick={rest.handleSaveClick}
                handleCancelClick={rest.handleCancelClick}
                errors={profileErrors} />
            }
            {!rest.editingProfile &&
              <EditProfileButton onClick={rest.handleEditClick} />
            }
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
                    error={rest.passwordError}
                    helperText={rest.passwordError ? "חובה 6 תווים, אות ומספר" : ""}
                    variant="outlined"
                    placeholder="סיסמה"
                    value={rest.editedPassword}
                    onChange={rest.handlePasswordChange}
                  ></TextField>
                </div>
              </div>
            ) : (
              <div>
                <Typography variant="h5" component="div" gutterBottom>
                  אימייל: {rest.username}
                </Typography>
              </div>
            )}
          </CardContent>

          {/* Buttons */}
          <CardActions>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
              {shouldRenderButtons() && <EditAccountButton onClick={rest.handleEditAccountClick} />}
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

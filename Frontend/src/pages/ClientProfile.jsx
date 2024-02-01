import React from 'react';
import { Card, CardContent, Typography, Avatar, CardActions, TextField, Box } from '@mui/material';
import {
  DeleteConfirmation, getAvatarStyle, EditProfileButton, EditAccountButton, ProfileEditButtons, AccountEditButtons,
  LogoutButton, DeleteButton
} from "../components/Profile";
import {ClientMenuList} from '../components/menu';
import useProfileLogic from '../hooks/useProfileLogic';
import "../styles/Profile.css";


export default function ClientProfile () {

  const shouldRenderButtons = () => !rest.editingAccount && !rest.deleteConfirmation;
  const { ...rest } = useProfileLogic();
  const accountErrors = {email: rest.emailError}
  const fullName = `${rest.firstname} ${rest.lastname}`;

  return (
    <>
      {/* Title */}
      <div className="title-container">
        <h1 id="title" style={{ color: "#ffa70f" }}>
          פרופיל לקוח
        </h1>
        <ClientMenuList />
      </div>

      {/* Page Content */}
      <div className="cards-container">
        <Card className="profile-card" style = {{minHeight: '610px'}}>

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

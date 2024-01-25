import React, { useState } from 'react';
import { Card, CardContent, Typography, Avatar, CardActions, Button } from '@mui/material';
import { Tabs, Tab, CardHeader } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import useProfileLogic from '../hooks/useProfileLogic';
import "../styles/VolunteerProfile.css";

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const {
    firstname,
    lastname,
    phone,
    editing,
    editedFirstname,
    editedLastname,
    editedPhone,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    setEditedFirstname,
    setEditedLastname,
    setEditedPhone,
  } = useProfileLogic();

  const DeleteConfirmation = () => (
    <div className="delete-confirmation">
      <p >Are you sure you want to delete your account?</p>
      <Button className="delete-account-button" onClick={confirmDelete}>Delete</Button>
      <Button onClick={closeDeleteConfirmation}>Cancel</Button>
    </div>
  );

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const EditButtons = () => (
    <>
      <Button size="small" onClick={handleSaveClick}>
        שמור
      </Button>
      <Button size="small" onClick={handleCancelClick}>
        בטל
      </Button>
    </>
  );

  const DefaultButtons = () => (
    <>
      <Button
        startIcon={<EditIcon />}
        size="small"
        onClick={handleEditClick}
        style={{ marginLeft: '20px' }}
      >
        ערוך פרופיל
      </Button>
    </>
  );

  function IssueBox({ imageSrc = '/images/profile.jpg', title, issueType,
    description, clientName = `${fullName}`, volunteerName, dateOpened }) {
    return (
      <div>
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', width: '300px' }}>
          <img src={imageSrc} alt="Content" style={{ width: '100%' }} />
          <Typography variant="h4" style={{ marginTop: '8px', textAlign: 'center' }}>
            {title}
          </Typography>

          <Typography variant="body1">
            <strong>סוג תקלה:</strong> {issueType}
          </Typography>

          <Typography variant="body1">
            <strong>תיאור:</strong> {description}
          </Typography>

          <Typography variant="body1">
            <strong>לקוח:</strong> {clientName}
          </Typography>

          <Typography variant="body1">
            <strong>מתנדב:</strong> {volunteerName}
          </Typography>

          <Typography variant="body1">
            <strong>תאריך פתיחה:</strong> {dateOpened}
          </Typography>
        </div>
        <div style={{ paddingBottom: '10px' }} />
      </div>
    );
  }

  const logoutString = "\u200B התנתק";
  const fullName = `${firstname} ${lastname}`;

  return (
    <div className="profile-container">
      <Card className="profile-card" style={{ overflowY: 'auto' }}>
        <CardContent>
          {/* Profile Content */}
          <Avatar
            className="profile-avatar"
            alt="Profile Picture"
            src="/images/profile.jpg"
            sx={{ width: 150, height: 150 }}
          />
          {editing ? (
            <div>
              <div>
                <input
                  type="text"
                  placeholder="שם פרטי"
                  value={editedFirstname}
                  onChange={(e) => setEditedFirstname(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="שם משפחה"
                  value={editedLastname}
                  onChange={(e) => setEditedLastname(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="מס' טלפון"
                  value={editedPhone}
                  onChange={(e) => setEditedPhone(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div>
              <Typography variant="h4" component="div" gutterBottom style={{ fontWeight: 'bold', textAlign: 'center' }}>
                {fullName}
              </Typography>
              <Typography variant="h5" component="div" gutterBottom >
                טלפון: {phone}
              </Typography>
            </div>
          )}
        </CardContent>
        {/* Buttons */}
        <CardActions>
          {editing && <EditButtons />}
          {!editing && <DefaultButtons />}
        </CardActions>
        <CardHeader
          subheader={
            <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
              <Tab label="היסטוריה" />
              <Tab label="חשבון" />
            </Tabs>
          }
        />
        {activeTab === 0 && (
          <CardContent className='latest_issues'>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h4" component="div" gutterBottom style={{ fontWeight: 'bold' }}>
                בעיות אחרונות
              </Typography>
              <IssueBox
                title="נתקעתי בדרך"
                issueType="דרך חסומה"
                description="נתקעתי באמצע הדרך ואני זקוק לעזרה כדי להזיז את הרכב."
                clientName="שם הנהג"
                volunteerName="שם המתנדב"
                dateOpened="24 בינואר 2024"
              />
              <IssueBox
                title="פנצ'ר בכביש"
                issueType="פנצ'ר"
                description="יש לי פנצ'ר באחת מהגלגלים ואני זקוק לעזרה כדי לשנות את הצמיג."
                clientName="שם הנהג"
                volunteerName="שם המתנדב"
                dateOpened="24 בינואר 2024"
              />
            </div>
          </CardContent>
        )}
        {activeTab === 1 && (
          <CardContent>
            <div id='account-details' style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h4" component="div" gutterBottom style={{ fontWeight: 'bold', textAlign: 'center' }}>
                פרטי חשבון
              </Typography>
              <Typography variant="h5" component="div" gutterBottom>
                טלפון: {phone}
              </Typography>
              <Button
                startIcon={<EditIcon />}
                size="small"
                style={{ marginLeft: '20px' }}
              >
                ערוך פרטים
              </Button>
              <Button
                startIcon={<LogoutIcon />}
                size="small"
                style={{ marginLeft: '20px' }}
              >
                {logoutString}
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                size="small"
                style={{ marginLeft: '20px' }}
                onClick={() => {setShowDeleteConfirmation(true);}}
              >
                מחק חשבון
              </Button>
            </div>
          </CardContent>
        )}

      </Card>
    </div>
  );
}

export default Profile;

import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "../styles/Profile.css";

function Profile() {
  const [firstname, setFirstname] = useState("John");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [editing, setEditing] = useState(false);
  const [editedFirstname, setEditedFirstname] = useState("");
  const [editedLastname, setEditedLastname] = useState("");
  const [editedPhone, setEditedPhone] = useState("");

  const fullName = `${firstname} ${lastname}`;

  const handleEditClick = () => {
    setEditing(true);
    setEditedFirstname(firstname);
    setEditedLastname(lastname);
    setEditedPhone(phone);
  };

  const handleSaveClick = () => {
    setFirstname(editedFirstname);
    setLastname(editedLastname);
    setPhone(editedPhone);
    setEditing(false);
  };

  const handleCancelClick = () => {
    setEditing(false);
  };

  const handleDeleteClick = () => {
    // You can implement your logic for handling the delete action here
    console.log('Delete clicked');
  };

  return (
    <div className="profile-container">
      <Card className="profile-card">
        <CardContent>
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
                placeholder="First Name"
                value={editedFirstname}
                onChange={(e) => setEditedFirstname(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                value={editedLastname}
                onChange={(e) => setEditedLastname(e.target.value)}
              />
            </div>
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                value={editedPhone}
                onChange={(e) => setEditedPhone(e.target.value)}
              />
            </div>
          </div>
          
          ) : (
            <div>
              <Typography variant="h5" component="div" gutterBottom>
                {fullName}
              </Typography>
              <Typography variant="body2" color="text.secondary" >
                Phone: {phone}
              </Typography>
            </div>
          )}
        </CardContent>
        <CardActions>
          {editing ? (
            <>
              <Button size="small" onClick={handleSaveClick}>
                Save
              </Button>
              <Button size="small" onClick={handleCancelClick}>
                Cancel
              </Button>
            </>
          ) : (
            <Button
              startIcon={<EditIcon />}
              size="small"
              onClick={handleEditClick}
            >
              Edit
            </Button>
          )}
          <Button
            startIcon={<DeleteIcon />}
            size="small"
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Profile;

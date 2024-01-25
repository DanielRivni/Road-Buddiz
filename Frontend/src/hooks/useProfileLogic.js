import { useState } from 'react';

const useProfileLogic = () => {
  // Profile Details
  const [firstname, setFirstname] = useState("שם פרטי");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");

  const [editingProfile, setEditingProfile] = useState(false);

  const [editedFirstname, setEditedFirstname] = useState("");
  const [editedLastname, setEditedLastname] = useState("");
  const [editedPhone, setEditedPhone] = useState("");

  // Account Details
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [editingAccount, setEditingAccount] = useState(false);

  const [editedUsername, setEditedUsername] = useState("");
  const [editedPassword, setEditedPassword] = useState("");

  // Buttons Handlers
  const handleEditClick = () => {
    setEditingProfile(true);
    setEditedFirstname(firstname);
    setEditedLastname(lastname);
    setEditedPhone(phone);
  };

  const handleSaveClick = () => {
    setFirstname(editedFirstname);
    setLastname(editedLastname);
    setPhone(editedPhone);
    setEditingProfile(false);
  };

  const handleCancelClick = () => {
    setEditingProfile(false);
  };

  const handleEditAccountClick = () => {
    setEditingAccount(true);
    setEditedUsername(username);
    setEditedPassword(password);
  };

  const handleSaveAccountClick = () => {
    setUsername(editedUsername);
    setPassword(editedPassword);
    setEditingAccount(false);
  }

  const handleCancelAccountClick = () => {
    setEditingAccount(false);
  }

  return {
    firstname,
    lastname,
    phone,
    username,
    password,
    editingProfile,
    editedFirstname,
    editedLastname,
    editedPhone,
    editedUsername,
    editedPassword,
    editingAccount,
    setEditedFirstname,
    setEditedLastname,
    setEditedPhone,
    setEditedUsername,
    setEditedPassword,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleEditAccountClick,
    handleSaveAccountClick,
    handleCancelAccountClick,
  };
};

export default useProfileLogic;

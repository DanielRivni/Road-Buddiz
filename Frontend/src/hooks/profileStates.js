import { useState } from 'react';
import { updateDocumentField, deleteFirestoreDocument} from '../middleware/firestore';
import { useNavigate } from 'react-router-dom';

const profileHook = (uid) => {
  const navigate = useNavigate();

  ////////////// Profile Details //////////////
  // States
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [firstnameError, setFirstnameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editedFirstname, setEditedFirstname] = useState("");
  const [editedLastname, setEditedLastname] = useState("");
  const [editedPhone, setEditedPhone] = useState("");

  // Handlers
  const handleEditClick = () => {
    setEditingProfile(true);
    setEditedFirstname(firstname);
    setEditedLastname(lastname);
    setEditedPhone(phone);
  };

  const handleSaveClick = () => {
    if (!firstnameError && editedFirstname.length > 0) {
      setFirstname(editedFirstname);
      updateDocumentField("users", uid, { firstName: editedFirstname });
    }
    if (!lastnameError) {
      setLastname(editedLastname);
      updateDocumentField("users", uid, { lastName: editedLastname });
    }
    if (!phoneError && editedPhone.length > 0) {
      setPhone(editedPhone);
      updateDocumentField("users", uid, { phoneNumber: editedPhone });
    }
    setEditingProfile(false);
  };

  const handleCancelClick = () => {
    setEditingProfile(false);
  };

  const handleFirstnameChange = (e) => {
    const inputFirstname = e.target.value;
    setEditedFirstname(inputFirstname);

    // Firstname validation
    const nameRegex = /^[^\d\s_]{2,12}$/u;
    const isValidFirstname = nameRegex.test(inputFirstname);
    console.log(isValidFirstname);

    // Update firstname error state
    setFirstnameError(!isValidFirstname && inputFirstname.length > 0);
  }

  const handleLastnameChange = (e) => {
    const inputLastname = e.target.value;
    setEditedLastname(inputLastname);

    // Lastname validation
    const nameRegex = /^[^\d\s_]+$/u;
    const isValidLastname = nameRegex.test(inputLastname);

    // Update lastname error state
    setLastnameError(!isValidLastname && inputLastname.length > 0);
  }

  const handlePhoneChange = (e) => {
    const inputPhone = e.target.value;
    setEditedPhone(inputPhone);

    // Phone validation
    const phoneRegex = /^\d{9,12}$/;
    const isValidPhone = phoneRegex.test(inputPhone);

    // Update phone error state
    setPhoneError(!isValidPhone && inputPhone.length > 0);
  }

  ////////////// Account Details //////////////
  // States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [editingAccount, setEditingAccount] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPassError] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedPassword, setEditedPassword] = useState("");

  // Handlers
  const handleUsernameChange = (e) => {
    const inputEmail = e.target.value;
    setEditedUsername(e.target.value)

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(inputEmail);

    // Update email error state
    setEmailError(!isValidEmail && inputEmail.length > 0);
  };

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setEditedPassword(e.target.value)

    // Password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/;
    const isValidPassword = passwordRegex.test(inputPassword);

    // Update password error state
    setPassError(!isValidPassword && inputPassword.length > 0);
  }

  const handleEditAccountClick = () => {
    setEditingAccount(true);
    setEditedUsername(username);
    setEditedPassword(password);
  };

  const handleSaveAccountClick = () => {
    if (!emailError && editedUsername.length > 0) {
      setUsername(editedUsername);
      updateDocumentField("users", uid, { email: editedUsername });
    }

    if (!passwordError && editedPassword.length > 0) {
      setPassword(editedPassword);
    }

    setEditingAccount(false);
  }

  const handleCancelAccountClick = () => {
    setEditingAccount(false);
  }

  ////////////// Delete Account //////////////
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const confirmDelete = () => {
    deleteFirestoreDocument("users", uid);
    localStorage.removeItem("loggedInID");
    closeDeleteConfirmation();
    navigate('/');
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation(false);
  };

  ////////////// Extra Methods //////////////

  const initProfile = (firstname, lastname, phone, username) => {
    setFirstname(firstname);
    setLastname(lastname);
    setPhone(phone);
    setUsername(username);
  }

  return {
    firstname,
    lastname,
    phone,
    username,
    emailError,
    password,
    passwordError,
    editingProfile,
    editedFirstname,
    editedLastname,
    editedPhone,
    firstnameError,
    lastnameError,
    phoneError,
    editedUsername,
    editedPassword,
    editingAccount,
    deleteConfirmation,
    initProfile,
    confirmDelete,
    closeDeleteConfirmation,
    setDeleteConfirmation,
    setEditedFirstname,
    setEditedLastname,
    setEditedPhone,
    setEditedUsername,
    setEditedPassword,
    handleUsernameChange,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleEditAccountClick,
    handleSaveAccountClick,
    handleCancelAccountClick,
    handlePasswordChange,
    handleFirstnameChange,
    handleLastnameChange,
    handlePhoneChange,
  };
};

export default profileHook;

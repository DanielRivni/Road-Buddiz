import { useState } from 'react';
import { updateDocumentField, deleteFirestoreDocument, uploadImageUpdDoc, deleteFile, readFirestoreDocument } from '../middleware/firestore';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase.js";
import { useNavigate } from 'react-router-dom';
import { getAuth, updatePassword, signOut } from "firebase/auth";
import { getClosedRequestsByVol } from "../middleware/firestore/requests";

const profileHook = () => {
  const auth = getAuth();
  const uid = auth.currentUser.uid;
  const navigate = useNavigate();

  ////////////// Upload Avatar //////////////
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);
  const [imgRemove, setImgRemove] = useState(false);
  const [origImg, setOrigImg] = useState(null);

  const handleImgChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImg(URL.createObjectURL(selectedFile));
    setImgRemove(false);
  };

  const handleImageRemove = () => {
    setFile(null);
    setImg(null);
    setImgRemove(true);
  };

  ////////////// Profile Details //////////////
  // States
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [editingProfile, setEditingProfile] = useState(false);
  const [editedFirstname, setEditedFirstname] = useState("");
  const [editedLastname, setEditedLastname] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [closedTasksCount, setClosedTasksCount] = useState(0);
  //error states
  const [firstnameError, setFirstnameError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  // Handlers
  const handleEditClick = () => {
    setEditingProfile(true);
    setEditedFirstname(firstname);
    setEditedLastname(lastname);
    setEditedPhone(phone);
    setOrigImg(img);
  };

  const handleSaveClick = async () => {
    if (!firstnameError && editedFirstname.length > 0) {
      setFirstname(editedFirstname);
      await updateDocumentField("users", uid, { firstName: editedFirstname });
    }
    if (!lastnameError) {
      setLastname(editedLastname);
      await updateDocumentField("users", uid, { lastName: editedLastname });
    }
    if (!phoneError && editedPhone.length > 0) {
      setPhone(editedPhone);
      await updateDocumentField("users", uid, { phoneNumber: editedPhone });
    }

    if (imgRemove) {
      // Delete old profile image
      const userDoc = await readFirestoreDocument("users", uid);
      const oldImgStorage = userDoc.profileImgStorage;
      if (userDoc && oldImgStorage) {
        await deleteFile(oldImgStorage);
        await updateDocumentField("users", uid, { profileImg: "", profileImgStorage: "" });
      }

      setEditingProfile(false);
    } else if (img !== origImg) {
      // Delete old profile image
      const userDoc = await readFirestoreDocument("users", uid);
      const oldImgStorage = userDoc.profileImgStorage;
      if (userDoc && oldImgStorage) {
        await deleteFile(oldImgStorage);
      }
      // Update profile image
      await uploadImageUpdDoc(file, `profileImages/`, "users", uid);
    }

    setEditingProfile(false);
  };

  const handleCancelClick = () => {
    if (origImg !== img) {
      setImg(origImg);
    }
    setImgRemove(false);
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
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
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
      updatePassword(auth.currentUser, editedPassword).then(() => {
        // Password updated.
      }).catch((error) => {
        // An error happened.
        console.log(error);
      });
    }

    setEditingAccount(false);
  }

  const handleCancelAccountClick = () => {
    setEditingAccount(false);
  }

  ////////////// Delete Account //////////////
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const confirmDelete = async () => {
    try {
      const userDoc = await readFirestoreDocument("users", uid);
      const imgStorage = userDoc.profileImgStorage;
      if (imgStorage) {
        await deleteFile(imgStorage);
      }
      await deleteFirestoreDocument("users", uid);
      const user = auth.currentUser;
      if (user) {
        await user.delete();
        console.log("User deleted");
      }
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle error gracefully, show error message to the user, etc.
    } finally {
      closeDeleteConfirmation();
    }
  };



  const closeDeleteConfirmation = () => {
    setDeleteConfirmation(false);
  };

  ////////////// Initiate states //////////////
  const initProfile = async (firstname, lastname, phone, username, profileImage) => {
    try {
      setFirstname(firstname);
      setLastname(lastname);
      setPhone(phone);
      setUsername(username);
      if (profileImage) {
        const downloadURL = await getDownloadURL(ref(storage, profileImage));
        setImg(downloadURL);
      }
      const closedTasks = await getClosedRequestsByVol(uid);
      console.log(closedTasks.length);
      setClosedTasksCount(closedTasks.length);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    img,
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
    closedTasksCount,
    handleImgChange,
    handleImageRemove,
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

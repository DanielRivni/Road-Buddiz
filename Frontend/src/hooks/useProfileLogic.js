import { useState } from 'react';

const useProfileLogic = () => {
  const [firstname, setFirstname] = useState("שם פרטי");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [editing, setEditing] = useState(false);
  const [editedFirstname, setEditedFirstname] = useState("");
  const [editedLastname, setEditedLastname] = useState("");
  const [editedPhone, setEditedPhone] = useState("");

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

  return {
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
  };
};

export default useProfileLogic;

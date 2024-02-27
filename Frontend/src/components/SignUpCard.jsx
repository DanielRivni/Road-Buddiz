import "../styles/SignUpPage.css";
import {
  Card, CardContent, CardActions, Typography, TextField, Button,
  Select, MenuItem, FormControlLabel, Checkbox, Snackbar, Alert
} from "@mui/material";
import { useState, useEffect } from "react";
import { craeteNewUserWithEmailAndPassword } from "../middleware/auth";
import { addUserToFirestore } from "../middleware/firestore/users/index.js";
import { useNavigate } from "react-router-dom";
import { getDocumentsByQuery } from "../middleware/firestore/index.js";
import CustomizedDialogs from "./TermsOfUseDialog.jsx";

function SignUpCard() {
  const navigate = useNavigate();
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState(2);
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    userType: false,
    password: false,
  });

  const registerUser = async () => {
    const fields = {
      firstName,
      lastName,
      email,
      phoneNumber,
      userType,
      password,
    };

    const errors = Object.entries(fields).reduce((acc, [key, value]) => {
      if (key !== "lastName" && !value) {
        acc[key] = true;
      }
      return acc;
    }, {});    

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    console.log("registering user");

    // Check if email or phone number is already in use
    try {
      const userExists = await checkUserExists(email, phoneNumber);
      if (userExists) {
        setOpenErrorSnackbar(true);
        return;
      }

      const userCredentials = await craeteNewUserWithEmailAndPassword(
        email,
        password
      );
      if (userCredentials) {
        const added = await addUserToFirestore(
          {
            firstName,
            lastName,
            email,
            phoneNumber,
            userType,
          },
          userCredentials?.user?.uid
        );
        if (added) {
          console.log("User added successfully");
          setOpenSuccessSnackbar(true);
          navigate("/", { state: { openSuccessSnackbar: true } });
        }
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  // Function to check if email or phone number already exists
  const checkUserExists = async (email, phoneNumber) => {
    try {
      const emailExists = await getDocumentsByQuery("users", {
        fieldName: "email",
        operation: "==",
        value: email
      });
      const phoneNumberExists = await getDocumentsByQuery("users", {
        fieldName: "phoneNumber",
        operation: "==",
        value: phoneNumber
      });

      return emailExists.length > 0 || phoneNumberExists.length > 0;
    } catch (error) {
      console.error("Error checking user existence:", error);
      setOpenErrorSnackbar(true);
      // Return true to prevent unintended registration attempts
      return true;
    }
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(inputEmail);

    // Update email error state
    setEmailError(!isValidEmail);
  };

  const handlePhoneNumberChange = (event) => {
    const inputPhoneNumber = event.target.value;

    // Remove any non-digit characters from the input
    const phoneNumberDigitsOnly = inputPhoneNumber.replace(/\D/g, "");

    // Limit the phone number to 10 digits
    const limitedPhoneNumber = phoneNumberDigitsOnly.slice(0, 10);

    setPhoneNumber(limitedPhoneNumber);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      registerUser();
    }
  };

  const handleCloseSuccessSnackbar = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessSnackbar(false);
  };

  const handleCloseErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
  };

  return (
    <>
      <div id="signup-page-content">
        <Card id="signup-page-card">
          <CardContent
            id="signup-page-card-content"
            className="center-div-column"
          >
            <div className="card-title">
              <Typography variant="h4" component="h3" color="text.primary">
                <div>הרשמה</div>
              </Typography>
            </div>
            <div
              id="signup-page-inputs-container"
              className="center-div-column"
            >
              <TextField
                className="signup-page-inputs"
                variant="outlined"
                placeholder="שם פרטי"
                value={firstName}
                error={formErrors.firstName}
                helperText={formErrors.firstName ? "שדה חובה" : ""}
                onChange={handleFirstNameChange}
                onKeyDown={handleKeyPress}
              ></TextField>
              <TextField
                className="signup-page-inputs"
                variant="outlined"
                placeholder=" (אופציונלי) שם משפחה"
                value={lastName}
                onChange={handleLastNameChange}
                onKeyDown={handleKeyPress}
              ></TextField>
              <TextField
                id="email-error"
                error={formErrors.email || emailError}
                helperText={
                  formErrors.email
                    ? "שדה חובה"
                    : emailError
                      ? "אימייל לא תקין"
                      : ""
                }
                className="signup-page-inputs"
                variant="outlined"
                placeholder="אימייל"
                value={email}
                onChange={handleEmailChange}
                onKeyDown={handleKeyPress}
              ></TextField>
              <TextField
                className="signup-page-inputs"
                variant="outlined"
                placeholder="מספר טלפון"
                value={phoneNumber}
                error={formErrors.phoneNumber}
                helperText={formErrors.phoneNumber ? "שדה חובה" : ""}
                onChange={handlePhoneNumberChange}
                onKeyDown={handleKeyPress}
              ></TextField>
              <Select
                className="signup-page-inputs"
                variant="outlined"
                value={userType}
                error={formErrors.userType}
                onChange={handleUserTypeChange}
              >
                <MenuItem value={1}>מתנדב</MenuItem>
                <MenuItem value={2}>זקוק לסיוע</MenuItem>
              </Select>
            </div>
            <TextField
              className="signup-page-inputs"
              variant="outlined"
              type="password"
              placeholder="סיסמה"
              value={password}
              error={!!(formErrors.password || (password && password.length < 8))}
              helperText={
                formErrors.password
                  ? "שדה חובה"
                  : password && password.length < 8
                    ? "הסיסמה חייבת להיות לפחות 8 תווים"
                    : ""
              }
              onChange={handlePasswordChange}
              onKeyDown={handleKeyPress}
            ></TextField>
          </CardContent>
          <CardActions
            id="signup-page-card-actions"
            className="center-div-column"
          >
            <CustomizedDialogs handleSignup={registerUser} />
            <div id="signup-page-remember-me-check-box">
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="זכור אותי"
              />
              <div id="sign-in-text-container" className="center-div-row">
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    component="h3"
                    color="text.primary"
                    id="sign-in-text"
                  >
                    <div>נרשמת כבר?</div>
                    <a href="/">לחץ כדי להיכנס</a>
                  </Typography>
                </CardContent>
              </div>
            </div>
          </CardActions>

        </Card>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSuccessSnackbar}
      >
        <Alert
          onClose={handleCloseSuccessSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          <div style={{ marginRight: "10px", marginLeft: "10px" }}>הרשמה בוצעה בהצלחה!</div>
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseErrorSnackbar}
      >
        <Alert
          onClose={handleCloseErrorSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          <div style={{ marginRight: "10px", marginLeft: "10px" }}>
            כתובת האימייל או מספר הטלפון כבר קיימים במערכת
          </div>
        </Alert>
      </Snackbar>
    </>
  );
}

export default SignUpCard;

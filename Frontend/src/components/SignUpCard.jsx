import "../styles/SignUpPage.css";
import {
  Card, CardContent, CardActions, Typography, TextField, Button,
  Select, MenuItem, FormControlLabel, Checkbox, Snackbar, Alert
} from "@mui/material";
import { useState } from "react";
import { craeteNewUserWithEmailAndPassword } from "../middleware/auth";
import { addUserToFirestore } from "../middleware/firestore/users/index.js";
import { useNavigate } from "react-router-dom";

function SignUpCard() {
  const navigate = useNavigate();
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
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);

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
      if (!value) acc[key] = true;
      return acc;
    }, {});
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
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
        setOpenSuccessSnackbar(true);
        navigate("/", { state: { openSuccessSnackbar: true } });
      }
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
            <Button
              className="signup-page-card-actions-button"
              variant="contained"
              color="primary"
              onClick={registerUser}
            >
              הירשם
            </Button>
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
    </>
  );
}

export default SignUpCard;

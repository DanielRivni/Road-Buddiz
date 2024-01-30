import "../styles/SignUpPage.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { craeteNewUserWithEmailAndPassword } from "../middleware/auth";
import {addUserToFirestore} from "../middleware/firestore/users/index.js";

function SignUpCard() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState(2);
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    const userCredentials = await craeteNewUserWithEmailAndPassword(
      email,
      password
    );
    if (userCredentials)
      await addUserToFirestore({
        firstName,
        lastName,
        email,
        phoneNumber,
        userType,
      }, userCredentials?.user?.uid);
    console.log(userCredentials);
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
    setPhoneNumber(event.target.value);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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
                onChange={handleFirstNameChange}
              ></TextField>
              <TextField
                className="signup-page-inputs"
                variant="outlined"
                placeholder="שם משפחה"
                value={lastName}
                onChange={handleLastNameChange}
              ></TextField>
              <TextField
                id="email-error"
                error={emailError} // Use email error state
                helperText={emailError ? "אימייל לא תקין" : ""} // Show error message if email is invalid
                className="signup-page-inputs"
                variant="outlined"
                placeholder="אימייל"
                value={email}
                onChange={handleEmailChange}
              ></TextField>
              <TextField
                className="signup-page-inputs"
                variant="outlined"
                placeholder="מספר טלפון"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                //                type="number"
              ></TextField>
              <Select
                className="signup-page-inputs"
                variant="outlined"
                value={userType}
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
              onChange={handlePasswordChange}
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
    </>
  );
}

export default SignUpCard;

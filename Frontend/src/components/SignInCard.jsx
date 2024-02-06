import "../styles/HomePage.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { signInUserWithEmailAndPassword } from "../middleware/auth";
import { readFirestoreDocument } from "../middleware/firestore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignInCard() {
  const redirect = new useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(false);

  
  useEffect(() => {
    const loggedInID = localStorage.getItem("loggedInID") || null;
    if (loggedInID) {
      signInUser(loggedInID);
    }
    
  }, []);

  const signInUser = async (uid = "") => {
    if (uid === "") {
      // Check if email or password is empty
      if (!email || !password) {
        setFormError(true);
        return;
      }
      const userCredentials = await signInUserWithEmailAndPassword(email, password);
      if (!userCredentials) {
        console.error("User Not Found");
        return;
      };
      uid = userCredentials.user.uid;
      localStorage.setItem("loggedInID", uid);
    }

    const userDocument = await readFirestoreDocument("users", uid);
    if (!userDocument) {
      console.error("User id incorrect!");
      return;
    }
    const { userType } = userDocument;
    if (userType === undefined) {
      console.error("User data is missing fields or incorrect named fields");
      return;
    }

    //console.log(userType);
    switch (userType) {
      case 1:
        redirect("/VolunteerTaskPage", { replace: true, state: { id: uid } });
        break;
      case 2:
        redirect("/RequestsPage", { replace: true, state: { id: uid } });
        break;
      default:
        redirect("/");
        break;
    }
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

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <div id="home-page-content">
        <Card id="home-page-card">
          <CardContent
            id="home-page-card-content"
            className="center-div-column"
          >
            <div className="card-title">
              <Typography variant="h4" component="h3" color="text.primary">
                <div>היכנס</div>
              </Typography>
            </div>
            <div id="home-page-inputs-container" className="center-div-column">
              <TextField
                id="email-error"
                error={emailError || (formError && !email)}
                helperText={
                  (formError && !email)
                    ? "שדה חובה"
                    : emailError
                      ? "אימייל לא תקין"
                      : ""
                }
                className="home-page-inputs"
                variant="outlined"
                placeholder="אימייל או מספר טלפון"
                onChange={handleEmailChange}
              ></TextField>
              <TextField
                className="home-page-inputs"
                variant="outlined"
                type="password"
                placeholder="סיסמה"
                error={formError && !password} // Check formError and password state
                helperText={formError && !password ? "שדה חובה" : ""}
                onChange={handlePasswordChange}
              ></TextField>
            </div>
          </CardContent>
          <CardActions
            id="home-page-card-actions"
            className="center-div-column"
          >
            <Button
              className="home-page-card-actions-button"
              variant="contained"
              color="primary"
              onClick={signInUser}
            >
              היכנס
            </Button>
            <div id="home-page-remember-me-check-box">
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="זכור אותי"
              />
            </div>
          </CardActions>
          <CardContent>
            <Typography
              variant="subtitle1"
              component="h3"
              color="text.primary"
              className="center-div-row"
              id="sign-up-text"
            >
              <div>עוד לא נרשמת?</div>
              <a href="/SignUpPage">הירשם כאן</a>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default SignInCard;

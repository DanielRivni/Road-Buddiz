import "../styles/HomePage.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { signInUserWithEmailAndPassword } from "../middleware/auth";
import { getUserRole } from "../middleware/firestore/users";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function SignInCard() {
  const redirect = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(false);
  const location = useLocation();
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);

  useEffect(() => {
    if (location.state && location.state.openSuccessSnackbar) {
      setOpenSuccessSnackbar(true);
    }
  }, [location.state]);


  const handleCloseSuccessSnackbar = (event,reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccessSnackbar(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRole = await getUserRole();
        if (userRole) {
          redirectUser(userRole);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchData();
  }, []);

  const signInUser = async () => {
    try {
      // Check if email or password is empty
      if (!email || !password) {
        setFormError(true);
        return;
      }

      const userCredentials = await signInUserWithEmailAndPassword(
        email,
        password
      );
      if (!userCredentials) {
        console.error("User Not Found");
        return;
      }

      const userRole = await getUserRole(userCredentials.user.uid);
      if (!userRole) {
        console.error("User role not found");
      }

      redirectUser(userRole);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const redirectUser = (userRole) => {
    const { userType, loggedInUserID } = userRole;

    switch (userType) {
      case 1:
        redirect("/VolunteerTaskPage", {
          replace: true,
          state: { uid: loggedInUserID },
        });
        break;
      case 2:
        redirect("/RequestsPage", {
          replace: true,
          state: { uid: loggedInUserID },
        });
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      signInUser();
    }
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
                  formError && !email
                    ? "שדה חובה"
                    : emailError
                    ? "אימייל לא תקין"
                    : ""
                }
                className="home-page-inputs"
                variant="outlined"
                placeholder="אימייל"
                onChange={handleEmailChange}
                onKeyDown={handleKeyPress}
              ></TextField>
              <TextField
                className="home-page-inputs"
                variant="outlined"
                type="password"
                placeholder="סיסמה"
                error={formError && !password} // Check formError and password state
                helperText={formError && !password ? "שדה חובה" : ""}
                onChange={handlePasswordChange}
                onKeyDown={handleKeyPress}
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
            <div style={{ marginRight: "10px" ,marginLeft: "10px"}}>הרשמה בוצעה בהצלחה!</div>
            </Alert>
          </Snackbar> 
    </>
  );
}

export default SignInCard;

import "../styles/SignUpPage.css"
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function SignUpPage() {
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
            <div id = "profile-icon">
            <PersonAddIcon sx={{ fontSize: 50 }}/>
          </div>
            <div id="signup-page-inputs-container" className="center-div-column">
              <TextField
                className="signup-page-inputs"
                variant="outlined"
                placeholder="שם פרטי"
              ></TextField>
              <TextField
                className="signup-page-inputs"
                variant="outlined"
                placeholder="שם משפחה"
              ></TextField>
              <TextField
                className="signup-page-inputs"
                variant="outlined"
                placeholder="אימייל"
              ></TextField>
              <TextField
                className="signup-page-inputs"
                variant="outlined"
                placeholder="מספר טלפון"
//                type="number"
              ></TextField>
              <TextField
                className="signup-page-inputs"
                variant="outlined"
                placeholder="סוג משתמש"
              ></TextField>
            </div>
            <TextField
                className="signup-page-inputs"
                variant="outlined"
                type="password"
                placeholder="סיסמה"
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

export default SignUpPage;

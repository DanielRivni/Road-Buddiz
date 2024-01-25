import "../styles/HomePage.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function HomePage() {
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
                className="home-page-inputs"
                variant="outlined"
                placeholder="אימייל או מספר טלפון"
              ></TextField>
              <TextField
                className="home-page-inputs"
                variant="outlined"
                type="password"
                placeholder="סיסמה"
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

export default HomePage;

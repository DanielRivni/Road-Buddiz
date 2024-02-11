import React from "react";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import { LocalGasStation, TireRepair, Cable } from "@mui/icons-material";
import "../styles/OpenTaskPage.css";

const useStyles = styled({
  list: {
    width: 250,
  },
});

const OpenTaskPage = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <Button
          variant="contained"
          id="open-new-request-button"
          onClick={handleClickOpen}
        >
          פתיחת תקלה
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>בחר תקלה</DialogTitle>
          <DialogContent>
            <List className={classes.list}>
              <ListItem button>
                <ListItemIcon>
                  <LocalGasStation />
                </ListItemIcon>
                <ListItemText primary="שירות דלק" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <TireRepair />
                </ListItemIcon>
                <ListItemText primary="החלפת צמיג" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Cable />
                </ListItemIcon>
                <ListItemText primary="טעינת/החלפת מצבר" />
              </ListItem>
            </List>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default OpenTaskPage;

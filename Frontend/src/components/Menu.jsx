import * as React from "react";
import { Button, MenuItem, MenuList } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useNavigate } from "react-router-dom";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LogoutIcon from "@mui/icons-material/Logout";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Drawer from "@mui/material/Drawer";
import { signOut, getAuth } from "firebase/auth";

const ClientMenuList = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleIssuesClick = () => {
    navigate("/RequestsPage");
    setOpen(false); // Close the menu
  };

  const handleProfileClick = () => {
    navigate("/ClientProfile");
    setOpen(false);
  };

  const handleLogoutClick = async () => {
    try {
      await signOut(getAuth());
      navigate("/");
      setOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <Button
        id="composition-button"
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        {open ? (
          <MenuOpenIcon id="menu-icon" style={{ fontSize: 40 }} />
        ) : (
          <MenuIcon id="menu-icon" style={{ fontSize: 40 }} />
        )}
      </Button>
      <Drawer
        anchor="left"
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
          },
        }}
      >
        <MenuList
          autoFocusItem={open}
          className="composition-menu"
          aria-labelledby="composition-button"
        >
          <MenuItem
            onClick={handleProfileClick}
            style={{ fontSize: "1.2rem", padding: "16px" }}
          >
            <PermIdentityIcon style={{ marginLeft: 8 }} />
            פרופיל
          </MenuItem>
          <MenuItem
            onClick={handleIssuesClick}
            style={{ fontSize: "1.2rem", padding: "16px" }}
          >
            <FormatListBulletedIcon style={{ marginLeft: 8 }} />
            תקלות
          </MenuItem>
          <MenuItem
            onClick={handleLogoutClick}
            style={{ fontSize: "1.2rem", padding: "16px" }}
          >
            <LogoutIcon style={{ marginLeft: 8 }} />
            התנתק
          </MenuItem>
        </MenuList>
      </Drawer>
    </div>
  );
};

const VolunteerMenuList = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleIssuesClick = () => {
    navigate("/VolunteerTaskPage");
    setOpen(false);
  };

  const handleProfileClick = () => {
    navigate("/VolunteerProfile");
    setOpen(false);
  };

  const handleLogoutClick = async () => {
    try {
      await signOut(getAuth());
      navigate("/");
      setOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <Button
        id="composition-button"
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        {open ? (
          <MenuOpenIcon id="menu-icon" style={{ fontSize: 40 }} />
        ) : (
          <MenuIcon id="menu-icon" style={{ fontSize: 40 }} />
        )}
      </Button>
      <Drawer
        anchor="left"
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
          },
        }}
      >
        <MenuList
          autoFocusItem={open}
          className="composition-menu"
          aria-labelledby="composition-button"
        >
          <MenuItem
            onClick={handleProfileClick}
            style={{ fontSize: "1.2rem", padding: "16px" }}
          >
            <PermIdentityIcon style={{ marginLeft: 8 }} />
            פרופיל
          </MenuItem>
          <MenuItem
            onClick={handleIssuesClick}
            style={{ fontSize: "1.2rem", padding: "16px" }}
          >
            <FormatListBulletedIcon style={{ marginLeft: 8 }} />
            תקלות
          </MenuItem>
          <MenuItem
            onClick={handleLogoutClick}
            style={{ fontSize: "1.2rem", padding: "16px" }}
          >
            <LogoutIcon style={{ marginLeft: 8 }} />
            התנתק
          </MenuItem>
        </MenuList>
      </Drawer>
    </div>
  );
};

export { ClientMenuList, VolunteerMenuList };

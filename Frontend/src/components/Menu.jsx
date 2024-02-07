import * as React from "react";
import { Button, MenuItem, MenuList } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useNavigate } from "react-router-dom";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LogoutIcon from "@mui/icons-material/Logout";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Drawer from "@mui/material/Drawer";

const ClientMenuList = ({ uid }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleIssuesClick = () => {
    navigate("/RequestsPage", { state: { uid: uid } });
    setOpen(false); // Close the menu
  };

  const handleProfileClick = () => {
    navigate("/ClientProfile", { state: { uid: uid } });
    setOpen(false);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("loggedInID");
    navigate("/");
    setOpen(false);
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

const VolunteerMenuList = ({ uid }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleIssuesClick = () => {
    navigate("/VolunteerTaskPage", { replace: true, state: { uid: uid } });
    setOpen(false); // Close the menu
  };

  const handleProfileClick = () => {
    navigate("/VolunteerProfile", { replace: true, state: { uid: uid } });
    setOpen(false);
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
            פרופיל
          </MenuItem>
          <MenuItem
            onClick={handleIssuesClick}
            style={{ fontSize: "1.2rem", padding: "16px" }}
          >
            משימות
          </MenuItem>
        </MenuList>
      </Drawer>
    </div>
  );
};

export { ClientMenuList, VolunteerMenuList };

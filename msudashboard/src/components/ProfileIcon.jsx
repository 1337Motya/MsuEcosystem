import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { logout } from "../redux/actions/auth";
import { Box, Button, Menu, MenuItem } from "@material-ui/core";
import { FullscreenExitTwoTone } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  icon: {
    display: "flex",
  },
  name: {
    color: "white",
    marginRight: theme.spacing(2),
  },
}));

function ProfileIcon() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector(({ auth }) => auth.user);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onExitClick = () => {
    dispatch(logout());
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Box  className={classes.icon} alignItems="center">
          <span className={classes.name}>{user.firstName}</span>
          <Avatar src={user.photoUrl} className={classes.large} />
        </Box>
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={() => onExitClick()}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default ProfileIcon;

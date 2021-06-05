import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Box, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function Navbar() {
  const classes = useStyles();
  const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);
  const [isOpened, setIsOpened] = React.useState(false);
  const [newsListOpen, setNewsListOpen] = React.useState(false);
  const [libraryListOpen, setLibraryListOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setIsOpened(!isOpened)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Панель управления
          </Typography>
          {isAuthenticated ? (
            <ProfileIcon />
          ) : (
            <Link to="/login">
              <Button variant="contained" color="secondary">
                Войти
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>

      <div>
        <React.Fragment>
          <SwipeableDrawer
            anchor="left"
            open={isOpened}
            onClose={() => setIsOpened(false)}
            onOpen={() => setIsOpened(true)}
          >
            <div className={classes.list}>
              <List>
                <Box textAlign="cetner" p={2}>
                  Меню
                </Box>
                <Divider />
                <ListItem button onClick={() => setNewsListOpen(!newsListOpen)}>
                  <ListItemText primary="Новости" />
                  {newsListOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={newsListOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Link to="/news/drafts">
                      <ListItem button className={classes.nested}>
                        <ListItemText primary="Черновики" />
                      </ListItem>
                    </Link>
                    <Link to="/news/reviews">
                      <ListItem button className={classes.nested}>
                        <ListItemText primary="Рецензии" />
                      </ListItem>
                    </Link>
                    <ListItem button className={classes.nested}>
                      <ListItemText primary="Публикации" />
                    </ListItem>
                  </List>
                </Collapse>
                <ListItem button onClick={() => console.log(123)}>
                  <ListItemText primary={"Студенты"} />
                </ListItem>
                <ListItem button onClick={() => console.log(123)}>
                  <ListItemText primary={"Преподаватели"} />
                </ListItem>
                <Link to="/faculty/add">
                  <ListItem button onClick={() => console.log(123)}>
                    <ListItemText primary={"Факультеты"} />
                  </ListItem>
                </Link>
                <Link to="/users">
                  <ListItem button onClick={() => console.log(123)}>
                    <ListItemText primary={"Пользователи"} />
                  </ListItem>
                </Link>
                <Link to="/educationforms">
                  <ListItem button>
                    <ListItemText primary={"Формы обучения"} />
                  </ListItem>
                </Link>
                <ListItem
                  button
                  onClick={() => setLibraryListOpen(!libraryListOpen)}
                >
                  <ListItemText primary="Библиотека" />
                  {libraryListOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={libraryListOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Link to="/library/authors">
                      <ListItem button className={classes.nested}>
                        <ListItemText primary="Авторы" />
                      </ListItem>
                    </Link>
                    <Link to="/library/editions">
                      <ListItem button className={classes.nested}>
                        <ListItemText primary="Издания" />
                      </ListItem>
                    </Link>
                    <Link to="/library/genres">
                      <ListItem button className={classes.nested}>
                        <ListItemText primary="Жанры" />
                      </ListItem>
                    </Link>
                    <Link to="/library/editiontypes">
                      <ListItem button className={classes.nested}>
                        <ListItemText primary="Типы изданий" />
                      </ListItem>
                    </Link>
                    <Link to="/library/publishinghouses">
                      <ListItem button className={classes.nested}>
                        <ListItemText primary="издательства" />
                      </ListItem>
                    </Link>
                    <Link to="/library/pickuppoints">
                      <ListItem button className={classes.nested}>
                        <ListItemText primary="Пункты выдачи" />
                      </ListItem>
                    </Link>
                  </List>
                </Collapse>
                <Link to="/schedule">
                  <ListItem button>
                    <ListItemText primary="Расписание" />
                  </ListItem>
                </Link>
              </List>
            </div>
          </SwipeableDrawer>
        </React.Fragment>
      </div>
    </div>
  );
}

export default Navbar;

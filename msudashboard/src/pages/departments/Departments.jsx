import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import {
  deleteDepartment,
  fetchDepartments,
} from "../../redux/actions/departments";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";
import { Edit } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 40,
  },
  root: {
    maxWidth: 325,
    minWidth: 325,
    marginTop: 20,
    maxHeight: 350,
  },
  media: {
    height: 0,
    padding: "15%", // 16:9
  },
}));

function Departments({ facultyId }) {
  const dispatch = useDispatch();
  const departments = useSelector(({ departments }) => departments.departments);
  const isLoaded = useSelector(({ departments }) => departments.isLoaded);
  const classes = useStyles();

  React.useEffect(() => {
    console.log("загрузка списка кафедр")
    dispatch(fetchDepartments(facultyId));
  }, []);

  const onDelete = (id) => {
    dispatch(deleteDepartment(id));
    dispatch(fetchDepartments(facultyId));
  };

  return (
    <div className={classes.container}>
      <Tooltip title="Добавить кафедру" aria-label="add">
        <Link to={`/faculties/${facultyId}/departments/add`}>
          <Fab color="primary" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Link>
      </Tooltip>
      <Grid
        container
        spacing={20}
        md={12}
        alignContent="center"
        justify="center"
      >
        <Grid
          container
          item
          xs={12}
          alignContent="center"
          spacing={6}
          justify="center"
        >
          {isLoaded ? (
            departments.map((item) => (
              <Card className={classes.root}>
                <CardHeader />
                <CardMedia
                  className={classes.media}
                  image={item.imageUrl}
                  title={item.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    {item.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton aria-label="Удалить">
                    <DeleteIcon onClick={() => onDelete(item.id)} />
                  </IconButton>
                  <IconButton aria-label="открыть">
                    <Link to={`/faculties/${facultyId}/departments/edit/${item.id}`}>
                      <Edit color="secondary" />
                    </Link>
                  </IconButton>
                </CardActions>
              </Card>
            ))
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default Departments;

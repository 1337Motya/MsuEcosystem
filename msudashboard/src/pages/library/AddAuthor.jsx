import React from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { TextareaAutosize } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(16),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function AddAuthor() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [fatherName, setFatherName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [avatar, setAvatar] = React.useState(null);
  const classes = useStyles();

  return (
    <Container>
      <form className={classes.root} autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              autoComplete="fname"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              fullWidth
              id="firstName"
              label="Имя"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              required
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              id="lastName"
              label="Фамилия"
              name="lastName"
              autoComplete="lname"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              fullWidth
              id="email"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              label="Отчество"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField required fullWidth name="date" type="date" />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              label="Биография"
              type="text"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <DropzoneArea
            acceptedFiles={["image/*"]}
            dropzoneText={"Перетащите файл"}
            onChange={(files) => setAvatar(files)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Сохранить
          </Button>
        </Grid>
      </form>
    </Container>
  );
}

export default AddAuthor;

import React from "react";
import { Container, Button, FormControl } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import TextEditor from "../../components/TextEditor";
import { DropzoneArea } from "material-ui-dropzone";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { fetchTeachers } from "../../redux/actions/teachers";
import { addDepartment } from "../../redux/actions/departments";
import { makeStyles } from "@material-ui/core/styles";
import imageApi from "../../api/imageApi";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  dropzone: {
    maxWidth: 500,
    margin: "auto",
  },
}));

function AddDepartment() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [image, setImage] = React.useState(null);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const teachers = useSelector(({ teachers }) => teachers.teachers);
  const [manager, setManager] = React.useState(null);
  const { id } = useParams();
  const defaultProps = {
    options: teachers,
    getOptionLabel: (option) =>
      `${option.firstName} ${option.fatherName} ${option.lastName}`,
  };

  React.useEffect(() => {
    dispatch(fetchTeachers());
  }, []);

  React.useEffect(() => {
    setManager(teachers[0]);
  }, [teachers]);

  const submit = async () => {
    var ImageUrl = await imageApi.addFacultyImage(image[0]);
    dispatch(
      addDepartment({
        name: name,
        description: description,
        managerId: manager.id,
        facultyId: id,
        ImageUrl: ImageUrl,
      })
    );
  };

  return (
    <Container>
      <h2>Добавление кафедры</h2>
      <h3>Эмблема кафедры</h3>
      <div className={classes.dropzone}>
        <DropzoneArea
          acceptedFiles={["image/*"]}
          dropzoneText={"Перетащите файл"}
          onChange={(files) => setImage(files)}
          filesLimit={1}
        />
      </div>
      <h3>Название</h3>
      <TextField
        autoComplete="facultyName"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
        id="name"
        label="Название"
        autoFocus
      />
      <Autocomplete
        {...defaultProps}
        value={manager}
        onChange={(event, newValue) => {
          setManager(newValue);
        }}
        id="disable-close-on-select"
        renderInput={(params) => (
          <TextField {...params} label="Декан" margin="normal" />
        )}
      />
      <h3>Описание</h3>
      <TextEditor setText={setDescription} />
      <Button variant="contained" color="primary" onClick={() => submit()}>
        Добавить
      </Button>
    </Container>
  );
}

export default AddDepartment;

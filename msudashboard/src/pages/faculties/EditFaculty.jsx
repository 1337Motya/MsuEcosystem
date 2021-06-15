import React from "react";
import { Container, Button, CircularProgress } from "@material-ui/core";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import TextEditor from "../../components/TextEditor";
import { DropzoneArea } from "material-ui-dropzone";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { fetchTeachers } from "../../redux/actions/teachers";
import { fetchFaculty, updateFaculty } from "../../redux/actions/faculties";
import { makeStyles } from "@material-ui/core/styles";
import imageApi from "../../api/imageApi";
import Departments from "../departments/Departments";

const useStyles = makeStyles((theme) => ({
  dropzone: {
    maxWidth: 500,
    margin: "auto",
  },
}));

function EditFaculty() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [image, setImage] = React.useState(null);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const faculty = useSelector(({ faculties }) => faculties.currentFaculty);
  const isLoaded = useSelector(({ faculties }) => faculties.isLoaded);
  const teachers = useSelector(({ teachers }) => teachers.teachers);
  const [dean, setDean] = React.useState(null);
  const { id } = useParams();

  const defaultProps = {
    options: teachers,
    getOptionLabel: (option) =>
      `${option.firstName} ${option.fatherName} ${option.lastName}`,
  };

  React.useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchFaculty(id));
  }, []);

  React.useEffect(() => {
    console.log(isLoaded);
    setName(faculty.name);
    setDescription(faculty.description);
    setDean(faculty.dean);
  }, [isLoaded]);

  React.useEffect(() => {
    setDean(teachers[0]);
  }, [teachers]);

  const submit = async () => {
    var imageUrl = faculty.image;
    if (image !== null) {
      imageUrl = await imageApi.addFacultyImage(image[0]);
    }
    dispatch(
      updateFaculty({
        id: faculty.id,
        name: name,
        description: description,
        deanId: dean.id,
        ImageUrl: imageUrl,
      })
    );
  };

  return (
    <div>
      {isLoaded ? (
        <Container>
          <h2>Редактировать факультет</h2>
          <h3>Заменить эмблему факультета</h3>
          <div className={classes.dropzone}>
            <DropzoneArea
              acceptedFiles={["image/*"]}
              dropzoneText={"Перетащите файл"}
              onChange={(files) => setImage(files)}
              filesLimit={1}
            />
          </div>
          <h3>Изменить Название</h3>
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
            value={dean}
            onChange={(event, newValue) => {
              setDean(newValue);
            }}
            id="disable-close-on-select"
            renderInput={(params) => (
              <TextField {...params} label="Декан" margin="normal" />
            )}
          />
          <h3>Описание</h3>
          <TextEditor text={description} setText={setDescription} />
          <Button variant="contained" color="primary" onClick={() => submit()}>
            Сохранить
          </Button>
          <h3>Кафедры</h3>
          <Departments facultyId={faculty.id} />
        </Container>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default EditFaculty;

import React from "react";
import { Container, Button, CircularProgress } from "@material-ui/core";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import TextEditor from "../../components/TextEditor";
import { DropzoneArea } from "material-ui-dropzone";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { fetchTeachers } from "../../redux/actions/teachers";
import {
  fetchDepartment,
  updateDepartment,
} from "../../redux/actions/departments";
import { makeStyles } from "@material-ui/core/styles";
import imageApi from "../../api/imageApi";

const useStyles = makeStyles((theme) => ({
  dropzone: {
    maxWidth: 500,
    margin: "auto",
  },
}));

function EditDepartment() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [image, setImage] = React.useState(null);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const department = useSelector(
    ({ departments }) => departments.currentDepartment
  );
  const isLoaded = useSelector(({ departments }) => departments.isLoaded);
  const teachers = useSelector(({ teachers }) => teachers.teachers);
  const [manager, setManager] = React.useState(null);
  const { facultyId, departmentId } = useParams();

  const defaultProps = {
    options: teachers,
    getOptionLabel: (option) =>
      `${option.firstName} ${option.fatherName} ${option.lastName}`,
  };

  React.useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchDepartment(departmentId));
  }, []);

  React.useEffect(() => {
    console.log(departmentId);
    setName(department.name);
    setDescription(department.description);
    setManager(department.manager);
  }, [isLoaded]);

  React.useEffect(() => {
    setManager(teachers[0]);
  }, [teachers]);

  const submit = async () => {
    var imageUrl = department.imageUrl;
    if (image !== null) {
      imageUrl = await imageApi.addFacultyImage(image[0]);
    }
    dispatch(
      updateDepartment({
        id: department.id,
        facultyId: facultyId,
        name: name,
        description: description,
        managerId: manager.id,
        ImageUrl: imageUrl,
      })
    );
  };

  return (
    <div>
      {isLoaded ? (
        <Container>
          <h2>Редактировать кафедру</h2>
          <h3>Заменить эмблему кафедры</h3>
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
            value={manager}
            onChange={(event, newValue) => {
              setManager(newValue);
            }}
            id="disable-close-on-select"
            renderInput={(params) => (
              <TextField {...params} label="Заведующий" margin="normal" />
            )}
          />
          <h3>Описание</h3>
          <TextEditor text={description} setText={setDescription} />
          <Button variant="contained" color="primary" onClick={() => submit()}>
            Сохранить
          </Button>
        </Container>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default EditDepartment;

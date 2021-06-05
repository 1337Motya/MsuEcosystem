import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEducationForms,
  deleteEducationForm,
  updateEducationForm,
  addEducationForm,
} from "../../redux/actions/educationForms";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function EducationForms() {
  const dispatch = useDispatch();
  const [addOpen, setAddOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [edit, setEdit] = React.useState({id: "id", name: "name"});
  const educationForms = useSelector(
    ({ educationForms }) => educationForms.educationForms
  );
  const isLoaded = useSelector(({ educationForms }) => educationForms.isLoaded);
  const classes = useStyles();

  React.useEffect(() => {
    dispatch(fetchEducationForms());
  }, []);

  const onDelete = (id) => {
    dispatch(deleteEducationForm(id));
  };

  const createEducationForm = () => {
    dispatch(addEducationForm(name));
    setAddOpen(false);
  };

  const editEducationForm = () => {
    dispatch(updateEducationForm(edit));
    setEditOpen(false);
  };

  const onClickEdit = (item) => {
    setEdit(item);
    setEditOpen(true);
  };

  return (
    <Container>
      <h3>Формы обучения</h3>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">
                <AddCircleIcon onClick={() => setAddOpen(true)} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoaded ? (
              educationForms.map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="center">
                    <EditIcon onClick={() => onClickEdit(item)} />
                  </TableCell>
                  <TableCell align="center">
                    <DeleteIcon onClick={() => onDelete(item.id)} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow key={1}>
                <TableCell component="th" scope="row">
                  <CircularProgress />
                </TableCell>
                <TableCell align="center">
                  <CircularProgress />
                </TableCell>
                <TableCell align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <AddFormDialog
        handleClose={() => setAddOpen(false)}
        isOpen={addOpen}
        value={name}
        setValue={setName}
        submit={createEducationForm}
      />
      <EditFormDialog
        handleClose={() => setEditOpen(false)}
        isOpen={editOpen}
        value={edit}
        setValue={setEdit}
        submit={editEducationForm}
      />
    </Container>
  );
}

export default EducationForms;

function AddFormDialog({ handleClose, isOpen, value, setValue, submit }) {
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Добавить форму обучения
        </DialogTitle>
        <DialogContent>
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Название"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button onClick={submit} color="primary">
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function EditFormDialog({ handleClose, isOpen, value, setValue, submit }) {
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Изменить форму обучения
        </DialogTitle>
        <DialogContent>
          <TextField
            value={value.name}
            onChange={(e) => setValue({id: value.id, name: e.target.value})}
            autoFocus
            margin="dense"
            id="name"
            label="Название"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button onClick={submit} color="primary">
            Изменить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPickUpPoints,
  deletePickUpPoint,
  updatePickUpPoint,
  addPickUpPoint,
} from "../../redux/actions/library";
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

function PickUpPoints() {
  const dispatch = useDispatch();
  const [addOpen, setAddOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [pickUpPoint, setPickUpPoint] = React.useState({
    name: "",
    location: "",
  });
  const [edit, setEdit] = React.useState({
    id: "id",
    name: "name",
    location: "location",
  });
  const pickUpPoints = useSelector(({ library }) => library.pickUpPoints);
  const isLoaded = useSelector(({ library }) => library.isLoaded);
  const classes = useStyles();

  React.useEffect(() => {
    dispatch(fetchPickUpPoints());
  }, []);

  const onDelete = (id) => {
    dispatch(deletePickUpPoint(id));
  };

  const createPickUpPoint = () => {
    dispatch(addPickUpPoint(pickUpPoint));
    setAddOpen(false);
  };

  const editPickUpPoint = () => {
    dispatch(updatePickUpPoint(edit));
    setEditOpen(false);
  };

  const onClickEdit = (item) => {
    setEdit(item);
    setEditOpen(true);
  };

  return (
    <Container>
      <h3>Пукнты выдачи</h3>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Местонахождение</TableCell>
              <TableCell align="center" />
              <TableCell align="center">
                <AddCircleIcon onClick={() => setAddOpen(true)} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoaded ? (
              pickUpPoints.map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.location}
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
        value={pickUpPoint}
        setValue={setPickUpPoint}
        submit={createPickUpPoint}
      />
      <EditFormDialog
        handleClose={() => setEditOpen(false)}
        isOpen={editOpen}
        value={edit}
        setValue={setEdit}
        submit={editPickUpPoint}
      />
    </Container>
  );
}

export default PickUpPoints;

function AddFormDialog({ handleClose, isOpen, value, setValue, submit }) {
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Добавить пункт выдачи</DialogTitle>
        <DialogContent>
          <TextField
            value={value.name}
            onChange={(e) =>
              setValue({ name: e.target.value, location: value.location })
            }
            autoFocus
            margin="dense"
            id="name"
            label="Название"
            type="text"
            fullWidth
          />
          <TextField
            value={value.location}
            onChange={(e) =>
              setValue({ location: e.target.value, name: value.name })
            }
            autoFocus
            margin="dense"
            id="name"
            label="Местонахождение"
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
        <DialogTitle id="form-dialog-title">Изменить тип издания</DialogTitle>
        <DialogContent>
        <TextField
            value={value.name}
            onChange={(e) =>
              setValue({ id: value.id, name: e.target.value, location: value.location })
            }
            autoFocus
            margin="dense"
            id="name"
            label="Название"
            type="text"
            fullWidth
          />
          <TextField
            value={value.location}
            onChange={(e) =>
              setValue({ id: value.id, location: e.target.value, name: value.name })
            }
            autoFocus
            margin="dense"
            id="name"
            label="Местонахождение"
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

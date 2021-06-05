import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAuthors, deleteAuthor } from "../../redux/actions/library";
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
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  description: {
    maxWidth: 400,
  },
});

function Authors() {
  const dispatch = useDispatch();
  const authors = useSelector(({ library }) => library.authors);
  const isLoaded = useSelector(({ library }) => library.isLoaded);
  const classes = useStyles();

  React.useEffect(() => {
    dispatch(fetchAuthors());
  }, []);

  const onDelete = (id) => {
    dispatch(deleteAuthor(id));
  };
  return (
    <Container>
      <h3>Авторы</h3>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Фото</TableCell>
              <TableCell align="center">ФИО</TableCell>
              <TableCell align="center">Дата рождения</TableCell>
              <TableCell align="center">Биография</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">
                <Link to="/library/authors/create">
                  <AddCircleIcon />
                </Link>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoaded ? (
              authors.map((item) => (
                <TableRow key={item.id}>
                  <TableCell align="center">
                    <Avatar
                      alt={`${item.firstName} ${item.fatherName} ${item.lastName}`}
                      src={item.image}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {item.firstName} {item.fatherName} {item.lastName}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(item.birthDate)
                      .toLocaleString("ru")
                      .substring(0, 10)}
                  </TableCell>
                  <TableCell align="center" className={classes.description}>
                    {item.description}
                  </TableCell>
                  <TableCell align="center">
                    <Link to={`/library/authors/edit/${item.id}`}>
                      <EditIcon />
                    </Link>
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
                <TableCell align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Authors;

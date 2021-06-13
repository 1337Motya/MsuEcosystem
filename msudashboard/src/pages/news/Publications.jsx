import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPublications, publish, updatePublication } from "../../redux/actions/news";
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
import DeleteIcon from "@material-ui/icons/Delete";
import PublishIcon from "@material-ui/icons/Publish";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Publications() {
  const dispatch = useDispatch();
  const publications = useSelector(({ news }) => news.publications);
  const isLoaded = useSelector(({ news }) => news.isLoaded);
  const classes = useStyles();

  React.useEffect(() => {
    dispatch(fetchPublications());
    console.log(publications);
  }, []);

  const pinPublcation = (item) => {
    item.isPinned = !item.isPinned;
    console.log(item);
    dispatch(updatePublication(item));
  }

  return (
    <Container>
      <h3>Ваши рецензии</h3>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Заголовок</TableCell>
              <TableCell align="center">Автор</TableCell>
              <TableCell align="center">Редактор</TableCell>
              <TableCell align="center">Закреплено</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoaded ? (
              publications &&
              publications.map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.title}
                  </TableCell>
                  <TableCell align="center">{`${item.author.lastName} ${item.author.firstName} ${item.author.fatherName}`}</TableCell>
                  <TableCell align="center">{`${item.editor.lastName} ${item.editor.firstName} ${item.editor.fatherName}`}</TableCell>
                  <TableCell align="center">
                    <Switch
                      checked={item.isPinned}
                      onChange={(e) => pinPublcation(item)}
                      name="checkedA"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
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
    </Container>
  );
}

export default Publications;

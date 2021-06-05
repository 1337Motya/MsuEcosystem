import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchDrafts, deleteDraft } from "../../redux/actions/news";
import { makeStyles } from "@material-ui/core/styles";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function DraftsForReview() {
  const accountId = useSelector(({ auth }) => auth.user.accountId);
  const dispatch = useDispatch();
  const drafts = useSelector(({ news }) => news.drafts);
  const isLoaded = useSelector(({ news }) => news.isLoaded);
  const classes = useStyles();

  React.useEffect(() => {
    dispatch(fetchDrafts());
  }, []);

  const onDelete = (id) => {
    dispatch(deleteDraft(id));
  };

  return (
    <Container>
      <h3>Черновики</h3>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Заголовок</TableCell>
              <TableCell align="center">Готово к ревью</TableCell>
              <TableCell align="center">Проверено</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">
                <Link to="/news/drafts/create">
                  <AddCircleIcon />
                </Link>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoaded ? (
              drafts.map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.title}
                  </TableCell>
                  <TableCell align="center">
                    {item.isReadyForReview ? (
                      <CheckRoundedIcon />
                    ) : (
                      <ClearRoundedIcon />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {item.isReviewed ? (
                      <CheckRoundedIcon />
                    ) : (
                      <ClearRoundedIcon />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Link to={`/news/drafts/edit/${item.id}`}>
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
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default DraftsForReview;

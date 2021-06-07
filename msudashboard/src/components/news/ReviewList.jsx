import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchReviews, publish } from "../../redux/actions/news";
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function ReviewList() {
  const accountId = useSelector(({ auth }) => auth.user.accountId);
  const dispatch = useDispatch();
  const reviews = useSelector(({ news }) => news.reviews);
  const isLoaded = useSelector(({ news }) => news.isLoaded);
  const classes = useStyles();

  React.useEffect(() => {
    dispatch(fetchReviews());
  }, []);

  const publishReview = (id) => {
    dispatch(publish(id));
  };
  console.log(reviews);
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
              <TableCell align="center">Опубликовано</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoaded ? (
              reviews && reviews.map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.title}
                  </TableCell>
                  <TableCell align="center">{`${item.author.lastName} ${item.author.firstName} ${item.author.fatherName}`}</TableCell>
                  <TableCell align="center">
                    {!item.isPublished ? (
                      <PublishIcon
                        onClick={() => publishReview(item.id)}
                      />
                    ) : (
                      <CheckRoundedIcon />
                    )}
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

export default ReviewList;

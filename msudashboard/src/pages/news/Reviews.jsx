import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Container } from "@material-ui/core";
import DraftsForReview from "../../components/news/DraftsForReview";

const useStyles = makeStyles({
  root: {
    justifyContent: "center",
  },
  scroller: {
    flexGrow: "0",
  },
});

function Reviews() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        classes={{ root: classes.root, scroller: classes.scroller }}
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="on"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Черновики на проверку" >
          <DraftsForReview />
          <h2>123</h2>
        </Tab>
        <Tab label="Проверенные">
          123
        </Tab>
        
        <Tab label="Опубликованные" />
      </Tabs>
    </Paper>
  );
}

export default Reviews;

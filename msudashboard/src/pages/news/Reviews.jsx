import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { AppBar, Container } from "@material-ui/core";
import DraftsForReview from "../../components/news/DraftsForReview";
import ReviewList from "../../components/news/ReviewList";

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
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Paper className={classes.root}>
        <Tabs
          classes={{ root: classes.root, scroller: classes.scroller }}
          value={selectedTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Черновики на проверку" />
          <Tab label="Проверенные" />
          <Tab label="Опубликованные" />
        </Tabs>
      </Paper>
      {selectedTab === 0 && <DraftsForReview />}
      {selectedTab === 1 && <ReviewList />}
    </>
  );
}

export default Reviews;

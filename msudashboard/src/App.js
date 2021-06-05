import React from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import "./styles/App.css";
import PrivateRoute from "./routes/PrivateRoute";
import Users from "./pages/users/Users";
import { loadUserdata } from "./redux/actions/auth";
import AddFaculty from "./pages/faculties/AddFaculty";
import CreateDraft from "./pages/news/CreateDraft";
import Drafts from "./pages/news/Drafts";
import EditDraft from "./pages/news/EditDraft";
import Reviews from "./pages/news/Reviews";
import EducationForms from "./pages/EducationForms/EducationForms";
import Genres from "./pages/library/Genres";
import EditionTypes from "./pages/library/EditionTypes";
import PickUpPoints from "./pages/library/PickUpPoints";
import PublishingHouses from "./pages/library/PublishingHouses";
import Authors from "./pages/library/Authors";
import AddAuthor from "./pages/library/AddAuthor";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadUserdata());
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/login" component={Login} exact />
        <PrivateRoute path="/users" exact>
          <Users />
        </PrivateRoute>
        <PrivateRoute path="/faculty/add" exact>
          <AddFaculty />
        </PrivateRoute>
        <PrivateRoute path="/news/reviews" exact>
          <Reviews />
        </PrivateRoute>
        <PrivateRoute path="/news/drafts" exact>
          <Drafts />
        </PrivateRoute>
        <PrivateRoute path="/news/drafts/create" exact>
          <CreateDraft />
        </PrivateRoute>
        <PrivateRoute path="/news/drafts/edit/:id" exact>
          <EditDraft />
        </PrivateRoute>
        <PrivateRoute path="/educationforms" exact>
          <EducationForms />
        </PrivateRoute>
        <PrivateRoute path="/library/genres" exact>
          <Genres />
        </PrivateRoute>
        <PrivateRoute path="/library/editiontypes" exact>
          <EditionTypes />
        </PrivateRoute>
        <PrivateRoute path="/library/pickuppoints" exact>
          <PickUpPoints />
        </PrivateRoute>
        <PrivateRoute path="/library/publishinghouses" exact>
          <PublishingHouses />
        </PrivateRoute>
        <PrivateRoute path="/library/authors" exact>
          <Authors />
        </PrivateRoute>
        <PrivateRoute path="/library/authors/create" exact>
          <AddAuthor />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;

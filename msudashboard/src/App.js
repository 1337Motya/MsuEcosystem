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
      </Switch>
    </div>
  );
}

export default App;

import Header from "./Components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Pages/Home";
import Login from "./Components/Pages/Login";
import Registration from "./Components/Pages/Registration";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Mynotes from "./Components/Pages/Mynotes";
import Profile from "./Components/Pages/Profile";


const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/registration">
          <Registration />
        </Route>
        <Route path="/mynotes">
          <Mynotes />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import ShowNotification from "./config/notification";
import Posts from "./Pages/PostsPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AdminPage from "./Pages/AdminPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />

        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path='/posts'>
            <Posts />
          </Route>
          <Route path='/'>
            <AdminPage />
          </Route>
        </Switch>

        {/* toast notification for api calls */}
        <ToastContainer
          position='top-right'
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </div>
  );
}

export default App;

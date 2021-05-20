import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className='navbar navbar-default'>
      <div className='container-fluid'>
        <div className='navbar-header'>
          <a className='navbar-brand' href='/'>
            WebSiteName
          </a>
        </div>
        <ul className='nav navbar-nav'>
          <li>
            <Link to='/'>Admin</Link>
          </li>
          <li>
            <Link to='/posts'>Posts</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {Button} from 'react-bootstrap';
import './About.css'
import './MainContainer.css';

export default class Navbar extends Component {
  render() {
    const linkStyle = {textDecoration: 'none', color:'inherit'}
    return (
      <div className="border-bottom text-center pb-2">
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <h1><Link to="/" style={linkStyle}>Todo List</Link></h1>
          </div>
          <div className="col text-right">
            <a href="/auth/logout/" className="btn btn-dark">Log out</a>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Link to="/affirmation" style={linkStyle} className="text-muted">Positive Affirmation!</Link>
            <a href="/auth/about/" style={linkStyle} className="text-muted ml-4">About Us!</a>
          </div>
        </div>
      </div>
    )
  }
}

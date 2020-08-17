import React, { Component } from 'react';
import {Link} from "react-router-dom";
import './About.css'
import './MainContainer.css';

export default class Navbar extends Component {
  render() {
    const linkStyle = {textDecoration: 'none', color:'inherit'}
    return (
      <div className="border-bottom text-center pb-2">
        <h1><Link to="/" style={linkStyle}>Todo List</Link></h1>
        <Link to="/affirmation" style={linkStyle} className="text-muted">Positive Affirmation!</Link>
        <a href="/auth/about/" style={linkStyle} className="text-muted ml-4">About Us!</a>
      </div>
    )
  }
}

import React, { Component } from 'react';
import {Link} from "react-router-dom";
import './About.css'
import './MainContainer.css';

export default class Navbar extends Component {
  render() {
    const linkStyle = {textDecoration: 'none', color:'inherit'}
    return (
      <div className="border-bottom text-center pb-2">
        <h1><Link to="/" style={linkStyle}>Todo List by Eswar Prasad Clinton. A</Link></h1>
        <Link to="/about" style={linkStyle} className="text-muted">Know More!</Link>
      </div>
    )
  }
}

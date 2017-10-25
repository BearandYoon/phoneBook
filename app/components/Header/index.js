import React from 'react';
import { Link } from 'react-router';

import logo from 'assets/images/logo.png';

import './style.css';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="header-component">
        <div className="header-container">
          <Link to="/">
            <img className="logo-image" src={logo} alt="" />
          </Link>
          <div className="header-title-container">
            <h1 className="header-title">Phone Book</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;

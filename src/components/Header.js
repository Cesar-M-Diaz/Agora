import React, { useState } from 'react';
import Logo from '../assets/images/Logo.png';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

import '../assets/styles/components/Header.scss';

import { student } from './mock/student';

function Header() {
  const [state, setState] = useState({
    isAuth: true,
    searchInput: '',
    isSearchCollapsed: true,
    isMenuCollapsed: true,
    currentStudent: student[0],
    isProfileTooltipCollapsed: true,
  });

  const handleChange = (e) => {
    setState((prevState) => ({ ...prevState, searchInput: e.target.value }));
    console.log(state.currentStudent.profilePhoto);
  };

  const toggleSearchCollapse = () => {
    if (!state.isMenuCollapsed)
      setState((prevState) => ({
        ...prevState,
        isMenuCollapsed: !state.isMenuCollapsed,
      }));
    setState((prevState) => ({
      ...prevState,
      isSearchCollapsed: !state.isSearchCollapsed,
    }));
  };

  const toggleMenuCollapse = () => {
    if (!state.isSearchCollapsed)
      setState((prevState) => ({
        ...prevState,
        isSearchCollapsed: !prevState.isSearchCollapsed,
      }));
    setState((prevState) => ({
      ...prevState,
      isMenuCollapsed: !prevState.isMenuCollapsed,
    }));
  };

  const SignOut = () => {
    setState((prevState) => ({
      ...prevState,
      isAuth: !prevState.isAuth,
      isMenuCollapsed: true,
      isProfileTooltipCollapsed: true,
    }));
  };

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={Logo} alt="Logo" />
      </Link>
      <div className="header__search-container">
        <input
          onChange={handleChange}
          className="search-container__input"
          type="text"
          placeholder="Search"
        />
        <div className="search-container__icon-container">
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>

      <div className="mobile-nav-buttons-container">
        <FontAwesomeIcon onClick={toggleSearchCollapse} icon={faSearch} />
        <FontAwesomeIcon onClick={toggleMenuCollapse} icon={faBars} />
      </div>

      <div
        className={`mobile-search-input ${
          !state.isSearchCollapsed && 'active'
        }`}
      >
        <input
          onChange={handleChange}
          className="search-container__input"
          type="text"
          placeholder="Search"
        />
        <div className="search-container__icon-container">
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>

      <div className={`mobile-menu ${!state.isMenuCollapsed && 'active'}`}>
        {state.isAuth ? (
          <>
            <div className="mobile-menu__profile-photo-container">
              <img
                className="header__profile-photo"
                src={state.currentStudent.profilePhoto}
                alt="Profile"
              />
              <span className="header__profile-name">
                {state.currentStudent.name}
              </span>
            </div>
            <div className="mobile-menu__buttons">
              <Link to="/" className="mobile-menu__profile-button">
                Profile
              </Link>
              <Link
                onClick={SignOut}
                to="/"
                className="mobile-menu__signout-button"
              >
                Sign out
              </Link>
            </div>
          </>
        ) : (
          <div className="mobile__buttons-container">
            <Link
              to="/login"
              onClick={toggleMenuCollapse}
              className="button-container__signin-button"
              type="button"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              onClick={toggleMenuCollapse}
              className="button-container__register-button"
              type="button"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {state.isAuth ? (
        <div className="header__profile-photo-container" href="/">
          <img
            onClick={() =>
              setState((prevState) => ({
                ...prevState,
                isProfileTooltipCollapsed: !prevState.isProfileTooltipCollapsed,
              }))
            }
            className="header__profile-photo"
            src={state.currentStudent.profilePhoto}
            alt="Profile"
          />
          <div
            className={`header__profile-tooltip ${
              !state.isProfileTooltipCollapsed && 'active'
            }`}
          >
            <h3 className="profile-tooltip__name">
              {state.currentStudent.name}
            </h3>
            <Link to="/" className="profile-tooltip__profile">
              Profile
            </Link>
            <Link onClick={SignOut} to="/" className="profile-tooltip__signout">
              Sign out
            </Link>
          </div>
        </div>
      ) : (
        <div className="header__buttons-container">
          <Link
            to="/login"
            className="button-container__signin-button"
            type="button"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="button-container__register-button"
            type="button"
          >
            Register
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;

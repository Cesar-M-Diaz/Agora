import React, { useState } from 'react';
import Logo from '../assets/images/Logo.png';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

import '../assets/styles/components/Header.scss';

import { useDispatch, useSelector } from 'react-redux';
import logout from '../actions/logout';
import { AUTHORIZED } from '../actions/constants';

function Header() {
  const globalState = useSelector((state) => state);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    searchInput: '',
    isSearchCollapsed: true,
    isMenuCollapsed: true,
    isProfileTooltipCollapsed: true,
  });

  const handleChange = (e) => {
    setState((prevState) => ({ ...prevState, searchInput: e.target.value }));
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
      isMenuCollapsed: true,
      isProfileTooltipCollapsed: true,
    }));
    dispatch(logout());
  };

  return (
    <header className="header">
      <Link to={globalState.auth_status === AUTHORIZED ? '/home' : '/'}>
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
        {!!globalState.token ? (
          <>
            <div className="mobile-menu__profile-photo-container">
              <img
                className="header__profile-photo"
                src={globalState.currentUser.profile_photo}
                alt="Profile"
              />
              <span className="header__profile-name">
                {globalState.currentUser.name}
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

      {!!globalState.token ? (
        <div className="header__profile-photo-container">
          <img
            onClick={() =>
              setState((prevState) => ({
                ...prevState,
                isProfileTooltipCollapsed: !prevState.isProfileTooltipCollapsed,
              }))
            }
            className="header__profile-photo"
            src={globalState.currentUser.profile_photo}
            alt="Profile"
          />
          <div
            className={`header__profile-tooltip ${
              !state.isProfileTooltipCollapsed && 'active'
            }`}
          >
            <h3 className="profile-tooltip__name">
              {globalState.currentUser.name}
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
            data-testid="sign-in-button"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="button-container__register-button"
            type="button"
            data-testid="register-button"
          >
            Register
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;

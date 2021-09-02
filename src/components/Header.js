import React, { useState } from 'react';
import Logo from '../assets/images/Logo.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

import '../assets/styles/components/Header.css';

function Header(){
    const [state, setState] = useState({
        isAuth: false,
        searchInput: '',
        isSearchCollapsed: true,
        isMenuCollapsed: true
    });

    const handleChange = e => {
        setState(prevState => ({...prevState, searchInput: e.target.value}))
    }

    const toggleSearchCollapse = () => {
        if(!state.isMenuCollapsed) setState({isMenuCollapsed: !state.isMenuCollapsed});
        setState(prevState => ({...prevState, isSearchCollapsed: !state.isSearchCollapsed}));

    }

    const toggleMenuCollapse = () => {
        if(!state.isSearchCollapsed) setState({isSearchCollapsed: !state.isSearchCollapsed});
        setState(prevState => ({...prevState, isMenuCollapsed: !state.isMenuCollapsed}));
    }

    return(
        <header className="header">
            <a href="/">
                <img className="header__logo" src={Logo} alt="Logo" />
            </a>
            <div className="header__search-container">
                <input onChange={handleChange} className="search-container__input" type="text" placeholder="Search" />
                <div className="search-container__icon-container">
                    <FontAwesomeIcon icon={faSearch} />
                </div>
            </div>

            <div className="mobile-nav-buttons-container">
                <FontAwesomeIcon onClick={toggleSearchCollapse} icon={faSearch} />
                <FontAwesomeIcon onClick={toggleMenuCollapse} icon={faBars} />
            </div>

            <div className={`mobile-search-input ${!state.isSearchCollapsed && 'active'}`}>
                <input onChange={handleChange} className="search-container__input" type="text" placeholder="Search" />
                <div className="search-container__icon-container">
                    <FontAwesomeIcon icon={faSearch} />
                </div>   
            </div>

            <div className={`mobile-menu ${!state.isMenuCollapsed && 'active'}`}>
                {state.isAuth ? 
                    <div className="mobile-menu__profile-photo-container">
                        <a className="header__profile-photo-link" href="/">
                            {/* <img className="header__profile-photo" src={currentStudent.profile_photo} alt="Profile" /> */}
                        </a>
                        {/* <span>{currentStudent.name}</span> */}
                    </div>
                    :
                    <div className="mobile__buttons-container">
                        <button className="button-container__signin-button" type="button">Sign in</button>
                        <button className="button-container__register-button" type="button">Register</button>
                    </div>
                
                }
                {/* SUBJECTS COMPONENT WOULD GO HERE */}
            </div>
            
            {state.isAuth ? 
                <a className="header__profile-photo-link" href="/">
                    {/* <img className="header__profile-photo" src={currentStudent.profile_photo} alt="Profile" /> */}
                </a>
                :
                <div className="header__buttons-container">
                    <button className="button-container__signin-button" type="button">Sign in</button>
                    <button className="button-container__register-button" type="button">Register</button>
                </div>
            }
        </header>
    )
}

export default Header;
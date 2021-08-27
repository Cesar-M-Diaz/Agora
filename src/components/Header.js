import React from 'react';
import Logo from '../assets/images/Logo.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import '../assets/styles/components/Header.css';

import { mockStudents } from './data';

const currentStudent = mockStudents[0];

class Header extends React.Component{
    state = {
        isAuth: true,
        searchInput: ''
    }

    render(){
        const handleChange = e => {
            this.setState({searchInput: e.target.value})
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
                
                {this.state.isAuth ? 
                    <a href="/">
                        <img className="header__profile-photo" src={currentStudent.profile_photo} alt="Profile" />
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
}

export default Header;
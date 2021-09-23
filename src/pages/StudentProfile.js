import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import StudentProfileMenu from '../components/StudentProfileMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import updateStudentProfile from '../actions/updateStudentProfile';


import '../assets/styles/pages/StudentProfile.scss';

function StudentProfile(props){
    const dispatch = useDispatch();
    const state = useSelector(state => state.currentUser)
    const [isDisabled, setIsDisabled] = useState({
        email: true,
        password: true,
        submit: true
    })
    const [inputs, setInputs] = useState({
        email: state.email,
        password: ''
    })
    const [errors, setErrors] = useState({
        email: null,
        password: null,
        visible: false
    })


    useEffect(() => {
        if(inputs.email !== state.email || inputs.password !== null){
            setIsDisabled(prevState => ({...prevState, submit: false}))
        } else {
            setIsDisabled(prevState => ({...prevState, submit: true}))
        }
    }, [inputs, state]);

    const handleClick = e => {
        const buttonClass = e.currentTarget.className;
        if(buttonClass.match(/email/)){
            setIsDisabled(prevState => ({...prevState, email: !prevState.email}))
        } else if(buttonClass.match(/password/)){
            setIsDisabled(prevState => ({...prevState, password: !prevState.password}))
        }
    }

    const validateInputs = (email, password) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase())) {
        setErrors((prevState) => ({
            ...prevState,
            email: undefined
        }));
        } else {
            setErrors((prevState) => ({
                ...prevState,
                email: "Invalid email, please enter a valid email and try again."
            }));
            return false;
        }

        if (password && password.length < 4) {
            setErrors((prevState) => ({
                ...prevState,
                password: "Invalid password, the password is too short"
                }));
            return false;
        } else {
            setErrors((prevState) => ({
                ...prevState,
                password: undefined
            }));
        }
        return true;
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(validateInputs(inputs.email, inputs.password)){
            dispatch(updateStudentProfile(inputs));
        }
    }

    const handleChange = e => {
        setInputs(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    return(
        <>
            <section className="student-profile__menu-container">
                    <StudentProfileMenu />
            </section>
            <main className="student-profile-main">
                
                <section className="student-profile__photo-container">
                    <img className="student-profile__photo" src={state.profile_photo} alt={state.name} />
                    <label htmlFor="student-profile__photo__input" className="student-profile__photo__button">
                        Upload photo
                    </label>
                    <input id="student-profile__photo__input" className="student-profile__photo__input" type="file" accept="image/png, image/jpeg" />
                </section>
                <section className="student-profile__credentials">
                    <div className="student-profile__credentials__email-container">
                        <label className="student-profile__credentials__email-label" htmlFor="student-profile__credentials__email-input">Email</label>
                        <div className="student-profile__credentials__email-input-container">
                            <input onChange={handleChange} name="email" disabled={isDisabled.email} placeholder="Email" id="student-profile__credentials__email-input" className="student-profile__credentials__email-input" defaultValue={state.email} type="email" />
                            <button onClick={handleClick} className="student-profile__credentials__email-input-button" type="button"><FontAwesomeIcon icon={faPencilAlt} /></button>
                        </div>
                        <span className="student-profile__error-message">{errors.email}</span>
                    </div>

                    <div className="student-profile__credentials__password-container">
                        <label className="student-profile__credentials__password-label" htmlFor="student-profile__credentials__password-input">Password</label>
                        <div className="student-profile__credentials__password-input-container">
                            <input onChange={handleChange} name="password" disabled={isDisabled.password} placeholder="Password" id="student-profile__credentials__password-input" className="student-profile__credentials__password-input" defaultValue="**********" type="password" />
                            <button onClick={handleClick} className="student-profile__credentials__password-input-button" type="button"><FontAwesomeIcon icon={faPencilAlt} /></button>
                        </div>
                        <span className="student-profile__error-message">{errors.password}</span>
                    </div>
                </section>
                <div className="student-profile__credentials__submit-button-container">
                    <button disabled={isDisabled.submit} onClick={handleSubmit} className={`student-profile__submit-button ${isDisabled.submit && "disabled"}`} type="submit">Submit changes</button>
                </div>
            </main>
        </>
    )
}

export default StudentProfile;
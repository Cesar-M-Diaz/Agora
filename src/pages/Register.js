import React from 'react'
import register from '../assets/styles/pages/register.css'
import {FaUserAlt} from "react-icons/fa";
import {FaEnvelope} from "react-icons/fa";
import {FaKey} from "react-icons/fa";

class Student_Tutor extends React.Component {
    state = {
      register:'tutor',
    }
    handleStudent = () => {
        this.setState({ register: 'student' })
    }
    handleTutor = () => {
        this.setState({ register: 'tutor' })
      }
    render() {
        const rol={
        student:<RegisterStudent/>,
        tutor:<RegisterTutor/>,
    }
    const {student,tutor}=rol;
    let stateActive=rol[this.state.register];
    return (
        <div className="radios">
            <h2 className="tittle-rol">Do you want to be student or tutor?</h2>
            <h2 className="rol"><input type="radio" checked={stateActive===student ? true:false} onClick={this.handleStudent}/>student</h2>
            <h2 className="rol"><input type="radio" checked={stateActive===tutor ? true:false} onClick={this.handleTutor}/>tutor</h2>
            <p>{rol[this.state.register]}</p>
        </div>
      )
    }
  }


function Register(){
    return(
    <form className="form-register">
        <h2>Register</h2>
        <div className="inputs">
            <FaUserAlt fontSize="12px" color="#aaa"/>
            <input type="text" placeholder="Username"/>
            </div>
            <div className="inputs">
                <FaEnvelope fontSize="12px" color="#aaa"/>
                <input  type="email" placeholder="Email"/>
            </div>
            <div className="inputs">
                <FaKey fontSize="15px" color="#aaa"/>
                <input type="password" placeholder="Password"/>
            </div>
                <Student_Tutor/>
                <button type="submit">Register</button>
                <p>Do you already have a account? <a href="#">Long in</a> </p>
            </form>
    )
}
function RegisterTutor(){
    return(
            <form>
                <div className="inputs">
                <input type="text" placeholder="Profession"></input>    
                </div>
                <div className="inputs">
                <input type="email" placeholder="Focus"></input>    
                </div>
            </form>
    )
}
function RegisterStudent(){
    return(
            <form>
                <div className="inputs">
                <input type="text" placeholder="where do you study?"></input>    
                </div>
            </form>
    )
}
export {Register}
import register from '../assets/styles/components/register.css'

function Register(){
    return(
    <div className="form-register">
        <h4>Register</h4>
            <form>
                <input className="inputs" type="text" placeholder="First Name"></input>
                <input className="inputs" type="text" placeholder="Last Name"></input>
                <input className="inputs" type="email" placeholder="Email Address"></input>
                <input className="inputs" type="password" placeholder="Password"></input>
                <input className="inputs" type="password" placeholder="Confirm Password"></input>
                <button type="submit">Register Now</button>
            </form>
        </div>
    )
}
export default Register
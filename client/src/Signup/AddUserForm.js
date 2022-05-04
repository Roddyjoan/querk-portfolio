import { useState, useNavigate,useContext } from 'react';
import './signup.css'
function AddUserForm(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function submitHandler(event) {
        event.preventDefault()
    }

    return (
        <div className="login-page">
            <form onSubmit={submitHandler}>
            <label>Username:</label><br />
            <input onChange={event => setUsername(event.target.value)}></input><br /><br />
            <label>Password:</label><br />
            <input type="password" onChange={event => setPassword(event.target.value)}></input><br /><br />
            <button>Sign In</button>
            </form>
        </div>
    )
}


export default AddUserForm;
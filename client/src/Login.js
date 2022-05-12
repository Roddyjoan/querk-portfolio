import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import AuthContext from "./AuthContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useContext(AuthContext);
    const navigate = useNavigate();

    function submitHandler(event) {
        let api_url = process.env.REACT_APP_API_URL;

        event.preventDefault();
        fetch( api_url + "api/authenticate/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, password
            })
        })
        .then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                alert("Incorrect username or password.");
            }
        })
        .then(tokenContainer => {    
            console.log("tokenContainer: ", tokenContainer)
            const { jwt_token } = tokenContainer;
            console.log("jwt_token: ", jwt_token)
            localStorage.setItem("token", jwt_token);
            setUser({ user: jwtDecode(jwt_token) });
            navigate("/");
        })
        .catch(rejection => console.log(rejection))
    }

    return (
        <div className="with-margins">
            <form onSubmit={submitHandler}>
            <label>Email:</label><br />
            <input onChange={event => setUsername(event.target.value)}></input><br /><br />
            <label>Password:</label><br />
            <input type="password" onChange={event => setPassword(event.target.value)}></input><br /><br />
            <button>Sign In</button>
            </form>
        </div>
    )
}

export default Login;
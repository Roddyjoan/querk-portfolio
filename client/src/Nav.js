import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './AuthContext';
import { useNavigate } from "react-router-dom";

function Nav() {

    const [user, setUser] = useContext(AuthContext);
    const nav = useNavigate();

    function handleLogout() {
        let confirm =window.confirm("are you sure you want to logout?");
        if (confirm == true) {
            localStorage.removeItem("token");
            setUser(null);
            nav("/");
        }
    }

    return (
        <>
            <div>
                {user?.user ? (
                    <button onClick={handleLogout} className="loginButton">Logout {user.user.sub}</button>
                ) : (
                    <>
                        <Link to="/login"><button className="loginButton">Login</button></Link>
                        <Link to="/signup"><button className="signupButton">Sign up</button></Link>
                    </>
                )}
            </div>


            <div className="nav">
                {user?.user ? (
                    <>
                        <Link to="/"><button className="navButton">Home</button></Link>
                        <Link to="/"><button className="navButton">Restaurants</button></Link>
                    </>
                ) : (
                    <>
                        <Link to="/"><button className="navButton">Home</button></Link>
                        <Link to="/"><button className="navButton">Restaurants</button></Link>
                    </>
                )}
            </div>
        </>
    )
}

export default Nav;
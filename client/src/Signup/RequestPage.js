import { Link } from "react-router-dom";

function RequestPage() {

    return (
        <div className="with-margins"><h2>Sign Up</h2><br />
            Create your iQueue profile
            <br />
            as a Restaurant Owner or Customer
            <br /><br />
            <Link to="/signup/owner"><button>Restaurant</button></Link>&nbsp;&nbsp;&nbsp;
            <Link to="/signup/customer"><button>Customer</button></Link>
        </div>
    )
}

export default RequestPage;

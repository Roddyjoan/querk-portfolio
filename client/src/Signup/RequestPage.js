import { Link } from "react-router-dom";

function RequestPage() {

    return (
        <><h1>Sign Up</h1><br />
            Create your iQueue profile
            <br />
            as a Restaurant Owner or Customer
            <br /><br />
            <Link to="/signup/owner"><button>Restaurant</button></Link>&nbsp;&nbsp;&nbsp;
            <Link to="/signup/customer"><button>Customer</button></Link>
        </>
    )
}

export default RequestPage;

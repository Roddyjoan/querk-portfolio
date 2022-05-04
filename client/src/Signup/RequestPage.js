import { Link } from "react-router-dom";

function RequestPage() {

    return (
        <><h1>Get started today!</h1><br /><br />
            Create your iQueue profile
            <br />
            as a Restaurant Owner or Customer
            <br /><br />
            <Link to="/"><button class="burrito-button">Restaurant</button></Link>&nbsp;&nbsp;&nbsp;
            <Link to="/signup/customer"><button class="burrito-button">Customer</button></Link>
        </>
    )
}

export default RequestPage;
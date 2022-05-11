import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../AuthContext';

function CurrentCustomer(props) {
    const {customerId, name, phoneNum, email} = props.customerObj;
    const [user, setUser] = useContext(AuthContext);
    
    return (
        <div className="customer-card">
            <p><b>Name:</b> {name}</p>
            <p><b>Phone #:</b> {phoneNum}</p>
            <p><b>Email:</b> {email}</p>
            <Link to={'/editCustomer/' + user.user.jti}><button>Edit Customer Information</button></Link>
            <Link to={'/deleteCustomer/' + user.user.jti}><button>Delete Customer</button></Link>
        </div>
    )

}

export default CurrentCustomer;
import { Link } from 'react-router-dom';

function Customer(props) {
    const {customerId, name, phoneNum, email} = props.customerObj;
    
    return (
        <div className="customer-card">
            <p><b>Name:</b> {name}</p>
            <p><b>Phone #:</b> {phoneNum}</p>
            <p><b>Email:</b> {email}</p>
            <Link to={'/editCustomer/' + props.customerId}><button>Edit Customer Information</button></Link>
            <Link to={'/deleteCustomer/' + props.customerId}><button>Delete Customer</button></Link>
            </div>
    )

}

export default Customer;
import { Link } from 'react-router-dom';

function Customer(props) {
    const {name, phoneNum, Email} = props.customer;

    return (
        <div className="customer-card">
            <p><b>Name:</b> {name}</p>
            <p><b>Phone #:</b> {phoneNum}</p>
            <p><b>Email:</b> {Email}</p>
            <Link to={'/delete/' + props.customer.customerId}><button>Delete Customer</button></Link>
            <Link to={'/edit/' + props.agentObj.agentId}><button>Edit Customer Information</button></Link>
        </div>
    )

}

export default Customer;
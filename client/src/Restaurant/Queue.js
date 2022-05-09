import { Link } from 'react-router-dom';
import Customer from '../Customer/Customer';

function Queue(props) {
    const {queueId, customerId, phoneNum, email} = props.queueObj;

    return (
        //if ur a restaurant owner
        <>
            <div className="queue-card">
                <p><b>Customer Id:</b> {customerId}</p>
                <p><b>Name:</b> {customerId}</p>
                <p><b>Phone #:</b> {phoneNum}</p>
                <p><b>Email:</b> {email}</p>
                <p><b>Create Time:</b> {email}</p>
                <Link to={'/deleteQueue/' + queueId}><button>Delete Queue</button></Link>
                <Link to={'/editQueue/' + queueId}><button>Edit Queue Information</button></Link>
            </div>
            {/* if ur a customer this shows up */}
            <div className="queue-list">
                <p>Estimated wait time: </p>
                <p>Number of people in Queue: </p>
                <p>Join queue?</p>
            </div></>
    )

}

export default Queue;
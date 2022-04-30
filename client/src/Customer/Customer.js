import { Link } from 'react-router-dom';

function Agent(props) {
    const {firstName, lastName, middleName, dob, heightInInches} = props.agentObj;

    return (
        <div className="agent-card">
            <p><b>First Name:</b> {firstName}</p>
            <p><b>Middle Name:</b> {middleName}.</p>
            <p><b>Last Name:</b> {lastName}</p>
            <p><b>DOB:</b> {dob}</p>
            <p><b>Height (in):</b> {heightInInches}</p>
            <Link to={'/delete/' + props.agentObj.agentId}><button>Delete Agent</button></Link>
            <Link to={'/edit/' + props.agentObj.agentId}><button>Edit Agent</button></Link>
        </div>
    )

}

export default Agent;
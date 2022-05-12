import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';
import DeleteItem from './DeleteItem';
import EditItem from './EditItem';


function Item(props) {
    const { itemId, name, category, price, description, id } = props.itemObj;
    const [user, setUser] = useState(AuthContext);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    function showEdit(e) {
        e.preventDefault();
        setShowForm(true)
    }

    function handleDelete() {

        fetch("http://localhost:8090/api/menu/" + itemId, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                if (response.status === 204) {
                    console.log(response)
                    alert("Item Successfully deleted!");
                    window.location.reload()
                }

                else {
                    alert("how are you even seeing this X???")
                }
            })
    }




    return (
        <div className="item-card">
            <div className='item-title'>{name}</div>
            <p>{description}</p>
            <p>${price}</p>


            <button onClick={showEdit}>Edit this item</button>

            {showForm ? (
                <EditItem
                    itemObj={props.itemObj}
                    itemId={props.itemObj.itemId}
                    name={props.name}
                    category={props.category}
                    description={props.description}
                    price={props.price}
                    id={props.id} />
            ) : ""}

            {user?.user ? (user.user.authorities === "ROLE_OWNER" ? 
            <button onClick={handleDelete}> Delete this Item</button> : "" ): ""}




            <button>Add to Order</button>

        </div>
    )

}

export default Item;
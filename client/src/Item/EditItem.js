import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditItem(props) {

    const [name, setName] = useState(props.name);
    const [price, setPrice] = useState(props.price);
    const [description, setDescription] = useState(props.description);
    const [category, setCategory] = useState(props.category);
    const {itemId} = props.itemObj.itemId
    const {id} = props.id
    const [showForm, setShowForm] = useState(true);

    function handleShowForm(e){
        e.preventDefault();
        setShowForm(false);
    }
    const navigate = useNavigate();

    useEffect(
        () => {
            const jwt = localStorage.getItem("token");
            if (jwt == null) {
                navigate("/login");
            }
        },
        []
    );

    function handleCategory(e){

        setCategory(e.target.value);
        console.log(e.target.value)
       
    }

    function handleName(e) {
        e.preventDefault();
        setName(e.target.value)
    }

    function handlePrice(e) {
        e.preventDefault();
        setPrice(e.target.value)
    }

    function handleDescription(e) {
        e.preventDefault();
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        

        const newItem = {
            itemId: props.itemId,
            restaurantId: props.id,
            name: name,
            price: price,
            description: description,
            category: category
        };

        let api_url = process.env.REACT_APP_API_URL;

        fetch(api_url + "api/menu/" + props.itemId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(newItem)
        }).then(response => {
            if (response.ok) {
                alert("Successfully edited item.");
                navigate("/restaurants");
            } else {    
                alert("Could not add item.");
                return response.json()
            }
        }).then(data=> console.log(data))
        .catch(
            rejection => console.log("Failure! ", rejection)
        );
    }

    return (
        
        <>
            <div>
            {showForm ? (
                <><h2>Edit an item from your menu!</h2><form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <input onChange={handleName} default={name} id="name"></input><br />

                        <label htmlFor="price"> Price:$</label>
                        <input onChange={handlePrice} default={price} id="price" type="number"></input><br />

                        <label htmlFor="description">Description:</label>
                        <input onChange={handleDescription} default={description} id="description"></input><br />

                        <label htmlFor="category">Choose a category:</label>
                        <select onChange={handleCategory}>
                            <option selected> Select an option!</option>
                            <option value="entree" onChange={handleCategory}>Entree</option>
                            <option value="dessert" onChange={handleCategory}>Dessert</option>
                            <option value="beverage" onChange={handleCategory}>Beverage</option>
                            <option value="appetizer" onChange={handleCategory}>Appetizer</option>
                        </select>


                        <br />

                        <button type="submit">Submit</button>
                        <Link to={"/menu/" + props.id}><button onClick={handleShowForm}>Cancel</button></Link>
                    </form></>
            ) : ("") } 
            </div>
        </>
    )
}

export default EditItem;
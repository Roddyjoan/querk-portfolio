import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function AddItem() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const { id } = useParams();
    const [category, setCategory] = useState("");


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
        console.log(id);

        const newItem = {
            restaurantId: id,
            name: name,
            price: price,
            description: description,
            category: category
        };

        let api_url = process.env.REACT_APP_API_URL;

        fetch(api_url + "api/menu", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(newItem)
        }).then(response => {
            if (response.ok) {
                alert("Successfully added item.");
                navigate("/");
            } else {
                console.log(name)
                console.log(response.json())
                console.log(category)
                
                alert("Could not add item.");
            }
        }).catch(
            rejection => console.log("Failure! ", rejection)
        );
    }

    return (
        <>
            <div>
                <h2>Add an item to your menu</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input onChange={handleName} id="name"></input><br />

                    <label htmlFor="price"> Price:$</label>
                    <input onChange={handlePrice} id="price" type="number"></input><br />

                    <label htmlFor="description">Description:</label>
                    <input onChange={handleDescription} id="description"></input><br />

                    <label htmlFor="category">Choose a category:</label>
                    <select onChange={handleCategory} >
                        <option selected > Select an option!</option>
                        <option value="entree" onChange={handleCategory} >Entree</option>
                        <option value="dessert" onChange={handleCategory} >Dessert</option>
                        <option value="beverage" onChange={handleCategory} >Beverage</option>
                        <option value="appetizer" onChange={handleCategory} >Appetizer</option>
                    </select>


                    <br />

                    <button type="submit" >Submit</button>
                    <Link to={'/home'}><button>Cancel</button></Link>
                </form>
            </div>
        </>
    )
}

export default AddItem;
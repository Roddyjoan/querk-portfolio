import { Link } from 'react-router-dom';

function Item(props) {
    const {itemId, name, category, price, description} = props.itemObj;

    return (
        <div className="item-card">
            <div className='item-title'>{name}</div>
            <p>{description}</p>
            <p>${price}</p>
            <Link to={'/' + itemId}><button>Add to Order</button></Link>
        </div>
    )

}

export default Item;
import graphic from './graphic.png';
import burrito from './burrito.jpg';

function Home(){
    return (
        <>  
            <div id="wrapper">
                <img src={burrito} />
                <div>
                    <br />
                    <h3>Imagine you’re out at night with your friends and you just want to get some food.
                        But after you choose a restaurant, you have to wait for a table, wait to make your order, then wait for your food before you can eat.
                    </h3>
                    <br />
                    <h3>   
                        It’s 2022, why are you still waiting so long?
                    </h3>
                    <br />
                    <h3>
                        We designed iQueue, an app where you can pick a restaurant, put your party on the queue, and order your food all before you even arrive at the restaurant. When it’s almost your turn, you’ll be notified and the restaurant will begin preparing your food. That way, your food and table will be ready and waiting for you! 
                    </h3>
                </div>   
            </div>
            <img src={graphic} />
        </>
    )
}

export default Home;
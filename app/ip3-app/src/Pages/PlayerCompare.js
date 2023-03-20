import {React, useState} from "react";
import Api from '../Helpers/Api'; 
import SearchBar from "../Component/SearchBar";
import { useDrop } from "react-dnd";
import { PlayerResultsCard } from "../Component/PlayerResultsCard";

function PlayerCompare(){

    const [player, setPlayer] = useState("");
    const [players, setPlayers] = useState([]); 
    const [test, setTest] = useState()

    const searchPlayer = () => {
        console.log("search button clicked"); 
        Api.get(`search-player/${player}`)
    .then(res => {
        // console.log(res.data); 
        setPlayers(res.data);
    })
    .catch( err => {
        console.log(err);
    });
};


const updatePlayer = (player) => {
    setPlayer(player);
 }

    const [basket, setBasket] = useState([])
    const [{ isOver }, dropRef] = useDrop({
        accept: 'player',
        drop: (item) => { console.log(item.player); setBasket((basket) => 
                            !basket.includes(item.player) ? [...basket, item.player] : basket);
                        console.log(basket)},
        collect: (monitor) => ({
            isOver: monitor.isOver()
        }),
    });


    return(
        <div className="Player">
            <h1>This is the Player page</h1>
            <SearchBar keyword={player} onChange={updatePlayer} fun={searchPlayer}/>
            <div className="playerSection">
                <div className="results" id="res" >
                    {/* <div className="liEls">
                    </div> */}
                    {/* {players.map(player => <PlayerResultsCard draggable player={player} />)} */}
                 {/* <PlayerResultsCard draggable player={players}/> */}

                </div>
                {players.map(player => <PlayerResultsCard draggable player={player}/>)}
                {/* <ul>
                    {test}
                </ul> */}
            </div>
            <div className="basket" ref={dropRef}>
			    {/* Create a new array full of the dropped players.*/}
                {basket.map(player => <PlayerResultsCard player={player} />)}
                {/* {console.log(basket)} */}
                {isOver && <div>Drop Here!</div>}
            </div>
        </div>
    )

}

export default PlayerCompare; 
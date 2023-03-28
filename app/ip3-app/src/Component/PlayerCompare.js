import {React, useState} from "react";
import Api from '../Helpers/Api'; 
import SearchBar from "./SearchBar";
import { useDrop } from "react-dnd";
import { PlayerResultsCard } from "./PlayerResultsCard";
import PlayerCard from "./PlayerCard";
import DonutChart from "./DonutChart";

function PlayerCompare(){

    const [player, setPlayer] = useState("");
    const [players, setPlayers] = useState([]); 
    const [showElement, setShowElement] = useState(false); 

    const searchPlayer = () => {
        console.log("search button clicked"); 
        Api.get(`search-player/${player}`)
    .then(res => {
        console.log(res.data); 
        setPlayers(res.data);
        setShowElement(true);
    })
    .catch( err => {
        console.log(err);
    });
};


const updatePlayer = (player) => {
    setPlayer(player);
 }

    const [basket, setBasket] = useState([]);
    const [basket2, setBasket2] = useState([]);

    const [selectedPlayers, setSelectedPlayers] = useState([]); 

    const [dropPlayer1, setDropPlayer1] = useState("");
    const [dropPlayer2, setDropPlayer2] = useState("");

    const [{ isOver }, dropRef] = useDrop({
        accept: 'player',
        drop: (item) => { 
            setBasket([]); 
            setBasket((basket) => 
                            !basket.includes(item.player) ? [...basket, item.player] : basket);
                            selectedPlayers.push(item.player);
                            setDropPlayer1(item.player);
                        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        }),
    });

    
    const [{ isOver2 }, dropRef2] = useDrop({
        accept: 'player',
        drop: (item) => { 
            setBasket2([]); 
            setBasket2((basket2) => 
                            !basket2.includes(item.player) ? [...basket2, item.player] : basket2);
                            selectedPlayers.push(item.player);
                            setDropPlayer2(item.player);
                        },
        collect: (monitor) => ({
            isOver2: monitor.isOver()
        }),
    });

    const setToFalse = (e) => {
        setShowElement(false);
    };


    return(
        <div className="Player" onClick={e => setToFalse(e)}>
            <SearchBar keyword={player} onChange={updatePlayer} fun={searchPlayer}/>
            <div className="playerSearch-Section">
                {showElement ? players.map(player => <PlayerResultsCard draggable player={player}/>) : <div></div>}
            </div>
            <div className="PlayerCompareSection">
                <div className="PlayerCardSection">
                    <div className={basket == "" ? "CardSection1" : "CardSection1WithBasket"} ref={dropRef}>
                        {basket.map(player => <PlayerCard player={player} />)}
                        {isOver && !basket.includes(dropPlayer1) ? <p>Drop Player Here</p> : <p></p>}
                    </div>
                    <div className={basket2 == "" ? "CardSection2" : "CardSection2WithBasket"} ref={dropRef2}>
                        {basket2.map(player => <PlayerCard player={player} />)}
                        {isOver2 && !basket2.includes(dropPlayer2) ? <p>Drop Player Here</p> : <p></p>}

                    </div>
                </div>
            </div>


        </div>
    )

}

export default PlayerCompare; 
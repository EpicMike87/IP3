import { React, useState } from "react";
import Api from '../Helpers/Api';
import SearchBar from "./SearchBar";
import { useDrop } from "react-dnd";
import { PlayerResultsCard } from "./PlayerResultsCard";

function PlayerCompare() {

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
            .catch(err => {
                console.log(err);
            });
    };


    const updatePlayer = (player) => {
        setPlayer(player);
    }

    const [basket, setBasket] = useState([]);
    const [basket2, setBasket2] = useState([]);

    const [{ isOver }, dropRef] = useDrop({
        accept: 'player',
        drop: (item) => {
            console.log(item.player); setBasket((basket) =>
                !basket.includes(item.player) ? [...basket, item.player] : basket);
            console.log(basket)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        }),
    });

    // const [{ isOver }, dropRef] = useDrop({
    //     accept: 'player',
    //     drop: (item) => {setBasket(item.player)},
    //     collect: (monitor) => ({
    //         isOver: monitor.isOver()
    //     }),
    // });

    const [{ isOver2 }, dropRef2] = useDrop({
        accept: 'player',
        drop: (item) => {
            console.log(item.player); setBasket2((basket2) =>
                !basket2.includes(item.player) ? [...basket2, item.player] : basket2);
            console.log(basket2)
        },
        collect: (monitor) => ({
            isOver2: monitor.isOver()
        }),
    });

    const setToFalse = (e) => {
        setShowElement(false);
    };


    return (
        <div className="Player" onClick={e => setToFalse(e)}>
            <h1>This is the Player page</h1>
            <SearchBar keyword={player} placeholders={"Please Enter Player Name"} onChange={updatePlayer} fun={searchPlayer} />
            <div className="playerSearch-Section">
                {showElement ? players.map(player => <PlayerResultsCard draggable player={player} />) : <div></div>}
                {/* {players.map(player => <PlayerResultsCard draggable player={player}/>)} */}
            </div>
            <div className="PlayerCompareSection">
                <p>Hello This is the player compare section</p>
                <div className="PlayerCardSection">
                    {/* <p>Hello, This is the card Section</p> */}
                    <div className="CardSection1" ref={dropRef}>
                        {basket.map(player => <PlayerResultsCard player={player} />)}
                        {/* {<PlayerResultsCard player={basket} />} */}
                        {isOver ? <p>Drop Player Here</p> : <p></p>}
                        {/* <p>Drag Player Here</p> */}
                        {/* <div className="basket1" ref={dropRef} onClick={e => setToFalse(e)}> */}
                        {/* Create a new array full of the dropped players.*/}
                        {/* {basket.map(player => <PlayerResultsCard player={player} />)} */}
                        {/* {isOver ? <p>Drop Player Here</p> : <p>Drag Player Here</p>} */}
                        {/* </div> */}
                    </div>
                    <div className="CardSection2" ref={dropRef2}>
                        {basket2.map(player => <PlayerResultsCard player={player} />)}
                        {isOver2 ? <p>Drop Player Here</p> : <p></p>}
                        {/* <div className="basket2" ref={dropRef2} onClick={e => setToFalse(e)}> */}
                        {/* Create a new array full of the dropped players.*/}
                        {/* {basket.map(player => <PlayerResultsCard player={player} />)}
                            {isOver2 ? <p>Drop Player Here</p> : <p>Drag Player Here</p>}
                        </div> */}
                    </div>
                </div>
            </div>
            {/* <div className="basket" ref={dropRef} onClick={e => setToFalse(e)}> */}
            {/* Create a new array full of the dropped players.*/}
            {/* {basket.map(player => <PlayerResultsCard player={player} />)} */}
            {/* {console.log(basket)} */}
            {/* {isOver && <div>Drop Here!</div>}
            </div> */}
        </div>
    )

}

export default PlayerCompare; 
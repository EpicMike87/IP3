import { React, useState, useEffect } from "react";
import Api from '../Helpers/Api';
import SearchBar from "./SearchBar";
import { useDrop } from "react-dnd";
import {PlayerResultsCard} from './PlayerResultsCard';
import PlayerCard from "./PlayerCard";

function PlayerCompare() {

    const [player, setPlayer] = useState("");
    const [players, setPlayers] = useState([]);
    const [showElement, setShowElement] = useState(false);

    const [basket, setBasket] = useState([]);
    const [basket2, setBasket2] = useState([]);

    const [selectedPlayers, setSelectedPlayers] = useState([]);

    const [dropPlayer1, setDropPlayer1] = useState("");
    const [dropPlayer2, setDropPlayer2] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await Api.get(`search-player/${player}`)
                changeSelectionVisibility(true);
                if (player == "") {
                    changeSelectionVisibility(false);
                }
                setPlayers(data)
                console.log(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [player])

    document.addEventListener('click', function (event) {
        const searchBar = document.getElementsByClassName('searchBar')[0];
        const outsideClick = !searchBar.contains(event.target);
        if (outsideClick) changeSelectionVisibility(false);
        else if (player != "") changeSelectionVisibility(true);
    });

    const searchPlayer = () => {
        console.log("search button clicked");
        Api.get(`search-player/${player}`)
            .then(res => {
                console.log(res.data);
                setPlayers(res.data);
                changeSelectionVisibility(true);
            })
            .catch(err => {
                console.log(err);
            });
    };

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

    const changeSelectionVisibility = (on) => {
        const searchBar = document.getElementsByClassName('searchBarInput')[0];

        if (on) {
            setShowElement(true);
            searchBar.style.borderBottomLeftRadius = "0";
            searchBar.style.borderBottom = "1px dashed lightgrey";
        }
        else {
            setShowElement(false);
            searchBar.style.borderBottomLeftRadius = "8px";
            searchBar.style.borderBottom = "none";
        }
    }

    return (
        <div className="Player" onClick={e => setToFalse(e)}>
            <SearchBar keyword={player} onChange={setPlayer} fun={searchPlayer} />
            <div id="playerSelection" style={{ maxHeight: "300px" }}>
                <table className="playerTable sortable">
                    <tbody>
                        {showElement ? players.map(player => <PlayerResultsCard draggable player={player} />) : <div></div>}
                    </tbody>
                </table>
            </div>
            <div className="CompareSection">
                <div className="CardSections">
                    <div className={basket == "" ? "CardSection1" : "CardSection1WithBasket"} ref={dropRef}>
                        {basket.map(player => <PlayerCard player={player} />)}
                        {isOver && !basket.includes(dropPlayer1) ? <p>Drop Player Here</p> : <p style={{display: "none"}}></p>}
                        {!isOver && !basket.includes(dropPlayer1) ? <p>Search and Drag Player Here</p> : <p style={{display: "none"}}></p>}


                    </div>
                    <div className={basket2 == "" ? "CardSection2" : "CardSection2WithBasket"} ref={dropRef2}>
                        {basket2.map(player => <PlayerCard player={player} />)}
                        {isOver2 && !basket2.includes(dropPlayer2) ? <p>Drop Player Here</p> : <p style={{display: "none"}}></p>}
                        {!isOver2 && !basket2.includes(dropPlayer2) ? <p>Search and Drag Player Here</p> : <p style={{display: "none"}}></p>}

                    </div>
                </div>
            </div>

        </div>
    )

}

export default PlayerCompare; 
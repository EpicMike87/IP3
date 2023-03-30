import { useEffect, useState } from 'react';
import Api from '../Helpers/Api';
import SearchBar from "../Component/SearchBar";
import playerImage from "../images/playerImage.jpg";
import { useSearchParams } from "react-router-dom";


function Player() {
    const [playerName, setPlayerName] = useState("");
    const [players, setPlayers] = useState([]);
    const [playerInfo, setPlayerInfo] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const [showElement, setShowElement] = useState(false);

    const searchPlayer = () => {
        showDetail(players[0].id);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await Api.get(`search-player/${playerName}`)
                changeSelectionVisibility(true);
                if(playerName == ""){
                    changeSelectionVisibility(false);
                }
                setPlayers(data)
                console.log(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [playerName])

    useEffect(()=>{
        const playerId = searchParams.get("id");
        if(playerId != null){
            showDetail(playerId);
        }
     }, [])


    const showDetail = (playerId) => {
        Api.get(`players/id/${playerId}`)
            .then(res => {
                setPlayerInfo(res.data);
                changeSelectionVisibility(false);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
            const message = document.getElementById('message');
            message.style.display = 'none';
        showPlayerBio();
    }

    function showPlayerBio() {
        const playerBio = document.getElementById("playerBio");
        playerBio.style.display = "block";
    }

    document.addEventListener('click', function(event) {
        const searchBar = document.getElementsByClassName('searchBar')[0];
        const outsideClick = !searchBar.contains(event.target);
        if(outsideClick) changeSelectionVisibility(false);
        else if(playerName != "") changeSelectionVisibility(true);
      });

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

    const gotoTeam = (teamId) =>{
        window.location = `/team?id=${teamId}`;
    }

return (
    <div className="Players">
        <div className="backgroundImage">
            <img src={playerImage} alt="teamPageImage" className="teamPageImage"></img>
            <div class="backgroundOverlay"></div>
            <div class="pageHeaderBox"><h1>Player Search</h1></div>
            <br></br>
        </div>

        <div className="searchBarArea">
            <SearchBar keyword={playerName} placeholders={"Please Enter Player Name"} onChange={setPlayerName} fun={searchPlayer} />
            <div id='playerSelection'>
            <table className="playerTable sortable">
                <tbody>
            
                    {showElement ? players.map((playersData, index) =>
                        <tr key={index} onClick={(e) => showDetail(`${playersData.id}`)}>
                            <td><img src={playersData.photoUrl}></img></td>
                            <td>{`${playersData.firstName} ${playersData.lastName}`}</td>
                            <td>{playersData.position}</td>
                            <td>{playersData.team}</td>
                        </tr>
                    ) : <div></div> }
                </tbody>
            </table>
        </div>
        </div>
        <div id="message">Search to view player information.</div>
        <div id='playerBio'>
            {playerInfo.map((playersData, index) =>
                <h3>{`${playersData.firstName} ${playersData.lastName}`} Bio</h3>
            )}

            <table >
                <thead >
                    <tr>
                        <th>No</th>
                        <th>Player</th>
                        <th>Name</th>
                        <th>age</th>
                        <th>team</th>
                    </tr>
                </thead>
                <tbody>

                    {playerInfo.map((playersData, index) =>
                        <tr key={index}>
                            <td>{playersData.id}</td>
                            <td><img src={playersData.photoUrl} ></img></td>
                            <td>{`${playersData.firstName} ${playersData.lastName}`}</td>
                            <td>{playersData.age}</td>
                            <td id="teamCell" onClick={(e) => gotoTeam(`${playersData.teamId}`)}>{playersData.team}</td>
                        </tr>
                    )}

                </tbody>
            </table>
        </div>

        <br></br>
        <br></br>
    </div>
)
}

export default Player; 
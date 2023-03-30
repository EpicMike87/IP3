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

    const searchPlayer = () => {
        showDetail(players[0].id);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await Api.get(`search-player/${playerName}`)
                enablePlayerSelection()
                if(playerName == ""){
                    disablePlayerSelection()
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
                disablePlayerSelection();
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        showPlayerBio();
    }

    function hidePlayerBio() {
        const playerBio = document.getElementById("playerBio");
        playerBio.style.display = "none";
    }

    function showPlayerBio() {
        const playerBio = document.getElementById("playerBio");
        playerBio.style.display = "block";
    }

    function togglePlayerSelection() {
        var playerSelectEle = document.getElementById('playerSelection');

        var displaySetting = playerSelectEle.style.display;


        if (displaySetting == 'block') {

            playerSelectEle.style.display = 'none';
        }
        else {

            playerSelectEle.style.display = 'block';

        }
    }


    document.addEventListener('click', function(event) {
        const searchBar = document.getElementsByClassName('searchBar')[0];
        const outsideClick = !searchBar.contains(event.target);
        if(outsideClick) disablePlayerSelection();
        else if(playerName != "") enablePlayerSelection();
      });


    function enablePlayerSelection() {
        var playerSelectEle = document.getElementById('playerSelection');
        playerSelectEle.style.display = 'block';
        const searchBar = document.getElementsByClassName('searchBarInput')[0];
        searchBar.style.borderBottomLeftRadius = "0";
        searchBar.style.borderBottom = "1px dashed lightgrey";
    }

    function disablePlayerSelection() {
        var playerSelectEle = document.getElementById('playerSelection');
        playerSelectEle.scrollTop = 0;
        playerSelectEle.style.display = 'none';
        const searchBar = document.getElementsByClassName('searchBarInput')[0];
        searchBar.style.borderBottomLeftRadius = "8px";
        searchBar.style.borderBottom = "none";
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

                    {players.map((playersData, index) =>
                        <tr key={index} onClick={(e) => showDetail(`${playersData.id}`)}>
                            <td id="photoBox"><img src={playersData.photoUrl}></img></td>
                            <td id="nameBox">{`${playersData.firstName} ${playersData.lastName}`}</td>
                            <td id="posBox">{playersData.position}</td>
                            <td id="teamBox">{playersData.team}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        </div>



        <div id='playerBio'>
            {playerInfo.map((playersData, index) =>
                <h3>{`${playersData.firstName} ${playersData.lastName}`} Bio</h3>
            )}

            <table>
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
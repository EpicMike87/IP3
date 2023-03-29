import { useEffect, useState } from 'react';
import Api from '../Helpers/Api';
import SearchBar from "../Component/SearchBar";
import playerImage from "../images/playerImage.jpg";


function Player() {
    const [playerName, setPlayerName] = useState("");
    const [players, setPlayers] = useState([]);
    const [playerInfo, setPlayerInfo] = useState([])

    const searchPlayer = () => {
        togglePlayerSelection();

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await Api.get(`search-player/${playerName}`)
                enablePlayerSelection()
                if(playerName == ""){
                    disablePlayerSelection()
                }
                hidePlayerBio()
                setPlayers(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [playerName])


    const showDetail = (playerFullName) => {
        Api.get(`search-player/${playerFullName}`)
            .then(res => {
                console.log(res.data);
                setPlayerInfo(res.data);
                disablePlayerSelection();
            })
            .catch(err => {
                console.log(err);
            });
        console.log(playerInfo);
        showPlayerBio();
    }

    function hidePlayerBio() {
        var x = document.getElementById("playerBio");
        x.style.display = "none";
    }

    function showPlayerBio() {
        var x = document.getElementById("playerBio");
        x.style.display = "block";
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

    function enablePlayerSelection() {
        var playerSelectEle = document.getElementById('playerSelection');

        playerSelectEle.style.display = 'block';
    }

    function disablePlayerSelection() {
        var playerSelectEle = document.getElementById('playerSelection');

        playerSelectEle.style.display = 'none';
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
        </div>

        <div id='playerSelection'>
            <table className="playerTable scrolldown sortable">
                <tbody>

                    {players.map((playersData, index) =>
                        <tr key={index} onClick={(e) => showDetail(`${playersData.firstName} ${playersData.lastName}`)} data-toggle="modal" data-target="#myModal" className='hoverRows'>
                            <td id="photoBox"><img src={playersData.photoUrl}></img></td>
                            <td id="nameBox">{`${playersData.firstName} ${playersData.lastName}`}</td>
                            <td id="posBox">{playersData.position}</td>
                            <td id="teamBox">{playersData.team}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>


        <br></br>

        <div id='playerBio'>
            <br></br>
            {playerInfo.map((playersData, index) =>
                <h3>{`${playersData.firstName} ${playersData.lastName}`} Bio</h3>
            )}
            <br></br>

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
                            <td>{playersData.idNo}</td>
                            <td><img src={playersData.photoUrl} ></img></td>
                            <td>{`${playersData.firstName} ${playersData.lastName}`}</td>
                            <td>{playersData.age}</td>
                            <td>{playersData.team}</td>
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
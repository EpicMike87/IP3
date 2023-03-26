import { useEffect, useState } from 'react';
import Api from '../Helpers/Api';
import SearchBar from "../Component/SearchBar";
import playerImage from "../images/playerImage.jpg";


function Player() {
    const [playerName, setPlayerName] = useState("");
    const [players, setPlayers] = useState([]);
    const [playerInfo, setPlayerInfo] = useState([])

    const searchPlayer = () => {
        Api.get(`search-player/${playerName}`)
            .then(res => {
                console.log(res.data);
                setPlayers(res.data);
                hidingPlayerBio();
                const playerSection = document.getElementsByClassName('playerSection')[0];
                playerSection.style.display = 'flex';
            })
            .catch(err => {
                console.log(err);
            });
        console.log(players);
        togglePlayerSelection();

    }

    const updatePlayer = (playerName) => {
        setPlayerName(playerName);
    }

    const showDetail = (playerFullName) => {
        Api.get(`search-player/${playerFullName}`)
            .then(res => {
                console.log(res.data);
                setPlayerInfo(res.data);
                togglePlayerSelection();
            })
            .catch(err => {
                console.log(err);
            });
        console.log(playerInfo);
        togglePlayerBio();
    }

    function hidingPlayerBio() {
        var x = document.getElementById("playerBio");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    function togglePlayerBio() {
        // get the clock
        var myClock = document.getElementById('playerBio');

        // get the current value of the clock's display property
        var displaySetting = myClock.style.display;

        // also get the clock button, so we can change what it says
        var clockButton = document.getElementById('clockButton');

        // now toggle the clock and the button text, depending on current state
        if (displaySetting == 'block') {
            // clock is visible. hide it
            myClock.style.display = 'none';
            // change button text
            clockButton.innerHTML = 'Show clock';
        }
        else {
            // clock is hidden. show it
            myClock.style.display = 'block';
            // change button text
            clockButton.innerHTML = 'Hide clock';
        }
    }

    function togglePlayerSelection() {
        // get the clock
        var myClock = document.getElementById('playerSelection');

        // get the current value of the clock's display property
        var displaySetting = myClock.style.display;

        // also get the clock button, so we can change what it says
        var clockButton = document.getElementById('clockButton');

        // now toggle the clock and the button text, depending on current state
        if (displaySetting == 'block') {
            // clock is visible. hide it
            myClock.style.display = 'none';
            // change button text
            clockButton.innerHTML = 'Show clock';
        }
        else {
            // clock is hidden. show it
            myClock.style.display = 'block';
            // change button text
            clockButton.innerHTML = 'Hide clock';
        }
    }

    return (
        <div>
            <div className="backgroundImage">
                <img src={playerImage} alt="teamPageImage" className="teamPageImage"></img>
                <div class="backgroundOverlay"></div>
                <div class="pageHeaderBox"><h1>Player Search</h1></div>
                <br></br>
            </div>

            <div className="searchBarArea">
                <SearchBar keyword={playerName} placeholders={"Please Enter Player Name"} onChange={updatePlayer} fun={searchPlayer} />
            </div>

            <div id='playerSelection'>
                <br></br>
                <h2>Select a Player</h2>
                <br></br>
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
                    <br></br>
                    <tbody>

                        {players.map((playersData, index) =>
                            <tr key={index} onClick={(e) => showDetail(`${playersData.firstName} ${playersData.lastName}`)} data-toggle="modal" data-target="#myModal" className='hoverRows'>
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
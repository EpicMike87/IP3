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
                changeSelectionVisibility(true)
                if (playerName == "") {
                    changeSelectionVisibility(false)
                }
                setPlayers(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [playerName])

    useEffect(() => {
        const playerId = searchParams.get("id");
        if (playerId != null) {
            showDetail(playerId);
        }
    }, [])


    const showDetail = (playerId, playerPositionType) => {
        Api.get(`players/id/${playerId}`)
            .then(res => {
                setPlayerInfo(res.data);
                changeSelectionVisibility(false);
                console.log(res.data);
                showPlayerBio(playerPositionType);
            })
            .catch(err => {
                console.log(err);
            });

    }


    function showPlayerBio(playerPositionType) {

        const attackerplayerBio = document.getElementById("attackerplayerBio");
        const midfielderplayerBio = document.getElementById("midfielderplayerBio");
        const defenderplayerBio = document.getElementById("defenderplayerBio");
        const goalkeeperplayerBio = document.getElementById("goalkeeperplayerBio");
        const pageMessage = document.getElementById("message");


        switch (playerPositionType) {
            case "Attacker":

                attackerplayerBio.style.display = "block";

                midfielderplayerBio.style.display = "none";

                defenderplayerBio.style.display = "none";

                goalkeeperplayerBio.style.display = "none";

                pageMessage.style.display = "none";


                break;
            case "Midfielder":

                attackerplayerBio.style.display = "none";

                midfielderplayerBio.style.display = "block";

                defenderplayerBio.style.display = "none";

                goalkeeperplayerBio.style.display = "none";

                pageMessage.style.display = "none";

                break;
            case "Defender":

                attackerplayerBio.style.display = "none";

                midfielderplayerBio.style.display = "none";

                defenderplayerBio.style.display = "block";

                goalkeeperplayerBio.style.display = "none";

                pageMessage.style.display = "none";

                break;
            default:

                attackerplayerBio.style.display = "none";

                midfielderplayerBio.style.display = "none";

                defenderplayerBio.style.display = "none";

                goalkeeperplayerBio.style.display = "block";

                pageMessage.style.display = "none";

        }
    }


    function hidePlayerBio() {
        const playerBio = document.getElementById("playerBio");
        playerBio.style.display = "none";
    }


    document.addEventListener('click', function (event) {
        const searchBar = document.getElementsByClassName('searchBar')[0];
        const outsideClick = !searchBar.contains(event.target);
        if (outsideClick) changeSelectionVisibility(false);
        else if (playerName != "" || !outsideClick) changeSelectionVisibility(true);
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

    const gotoTeam = (teamId) => {
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
                                <tr key={index} onClick={(e) => showDetail(`${playersData.id}`, `${playersData.positionType}`)}>
                                    <td><img src={playersData.photoUrl} className="searchImage"></img></td>
                                    <td>{`${playersData.firstName} ${playersData.lastName}`}</td>
                                    <td>{playersData.position}</td>
                                    <td>{playersData.team}</td>
                                </tr>
                            ) : <div></div>}
                        </tbody>
                    </table>
                </div>
            </div>

            <div id="message">Search to view player information.</div>


            <div id='attackerplayerBio' className='playerInfoSection'>
                {playerInfo.map((playersData, index) => <h1>{`${playersData.firstName} ${playersData.lastName}`}</h1>)}
                <div className="teamStats">
                    <div className="rowBox alignCenterTop minWidth250">
                        {playerInfo.map((playersData, index) => <img src={playersData.photoUrl} alt="teamLogo"  className='playerProfileImage'></img>)}
                    </div>
                    <div className="rowBox alignTop">
                        <table>
                            <tr>
                                <th>Name:</th>
                                {playerInfo.map((playersData, index) => <td>{`${playersData.firstName} ${playersData.lastName}`}</td>)}
                            </tr>
                            <tr>
                                <th>Age:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.age}</td>)}
                            </tr>
                            <tr>
                                <th>Position:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.position}</td>)}
                            </tr>
                            <tr>
                                <th>Team:</th>
                                {playerInfo.map((playersData, index) => <td id="teamCell" onClick={(e) => gotoTeam(`${playersData.teamId}`)}>{playersData.team}</td>)}
                            </tr>

                            <tr>
                                <th>Rating:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.rating} </td>)}
                            </tr>

                            <tr>
                                <th>Matches Played:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.matchesPlayed} </td>)}

                            </tr>
                        </table>
                    </div>
                    <div className="rowBox alignTop">
                        <table>
                            <tr>
                                <th>Goals:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.goals} </td>)}

                            </tr>
                            <tr>
                                <th>Assists:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.assists} </td>)}

                            </tr>
                            <tr>
                                <th>Penalties Scored:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.penaltiesScored} </td>)}

                            </tr>
                            <tr>
                                <th>Shots:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.shots} </td>)}

                            </tr>
                            <tr>
                                <th>Shots On Target:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.shotsOnTarget} </td>)}

                            </tr>
                        </table>
                    </div>
                    <div className="rowBox alignTop">
                        <table>
                            <tr>
                                <th>Passes:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.passes} </td>)}

                            </tr>
                            <tr>
                                <th>Pass Accuracy:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.passAccuracy} </td>)}

                            </tr>
                        </table>
                    </div>
                </div>

            </div>

            <div id='midfielderplayerBio' className='playerInfoSection'>
                {playerInfo.map((playersData, index) => <h1>{`${playersData.firstName} ${playersData.lastName}`}</h1>)}
                <div className="teamStats">
                    <div className="rowBox alignCenterTop minWidth250">
                        {playerInfo.map((playersData, index) => <img src={playersData.photoUrl} alt="teamLogo"  className='playerProfileImage'></img>)}
                        <table>
                            <tr>
                                <th>Name:</th>
                                {playerInfo.map((playersData, index) => <td>{`${playersData.firstName} ${playersData.lastName}`}</td>)}
                            </tr>
                            <tr>
                                <th>Age:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.age}</td>)}
                            </tr>
                            <tr>
                                <th>Position:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.position}</td>)}
                            </tr>
                            <tr>
                                <th>Team:</th>
                                {playerInfo.map((playersData, index) => <td id="teamCell" onClick={(e) => gotoTeam(`${playersData.teamId}`)}>{playersData.team}</td>)}
                            </tr>

                            <tr>
                                <th>Rating:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.rating} </td>)}
                            </tr>
                            <tr>
                                <th>Matches Played:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.matchesPlayed} </td>)}

                            </tr>
                        </table>
                    </div>
                    <div className="rowBox alignTop">
                        <table>
                            <tr>
                                <th>Goals:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.goals} </td>)}

                            </tr>
                            <tr>
                                <th>Assists:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.assists} </td>)}

                            </tr>
                            <tr>
                                <th>Penalties Scored:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.penaltiesScored} </td>)}

                            </tr>
                            <tr>
                                <th>Shots:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.shots} </td>)}

                            </tr>
                            <tr>
                                <th>Shots On Target:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.shotsOnTarget} </td>)}

                            </tr>
                        </table>
                    </div>
                    <div className="rowBox alignTop">
                        <table>
                            <tr>
                                <th>Passes:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.passes} </td>)}

                            </tr>
                            <tr>
                                <th>Pass Accuracy:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.passAccuracy} </td>)}

                            </tr>
                            <tr>
                                <th>Red Cards:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.redCards} </td>)}

                            </tr>
                            <tr>
                                <th>Yellow Cards:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.yellowCards} </td>)}

                            </tr>
                        </table>
                    </div>
                </div>

            </div>

            <div id='defenderplayerBio' className="playerInfoSection">
                {playerInfo.map((playersData, index) => <h1>{`${playersData.firstName} ${playersData.lastName}`}</h1>)}
                <div className="teamStats">

                    <div className="rowBox alignCenterRop minWidth250">
                        {playerInfo.map((playersData, index) => <img src={playersData.photoUrl} alt="teamLogo"  className='playerProfileImage'></img>)}
                    </div>
                    <div className='rowBox alignTop'>
                        <table>
                            <tr>
                                <th>Name:</th>
                                {playerInfo.map((playersData, index) => <td>{`${playersData.firstName} ${playersData.lastName}`}</td>)}
                            </tr>
                            <tr>
                                <th>Age:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.age}</td>)}
                            </tr>
                            <tr>
                                <th>Position:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.position}</td>)}
                            </tr>
                            <tr>
                                <th>Team:</th>
                                {playerInfo.map((playersData, index) => <td id="teamCell" onClick={(e) => gotoTeam(`${playersData.teamId}`)}>{playersData.team}</td>)}
                            </tr>

                            <tr>
                                <th>Rating:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.rating} </td>)}
                            </tr>
                        </table>
                    </div>
                    <div className="rowBox alignTop">
                        <table>
                            <tr>
                                <th>Matches Played:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.matchesPlayed} </td>)}

                            </tr>
                            <tr>
                                <th>Goals:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.goals} </td>)}

                            </tr>
                            <tr>
                                <th>Assists:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.assists} </td>)}

                            </tr>
                            <tr>
                                <th>Penalties Scored:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.penaltiesScored} </td>)}

                            </tr>
                            <tr>
                                <th>Shots:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.shots} </td>)}

                            </tr>
                            <tr>
                                <th>Shots On Target:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.shotsOnTarget} </td>)}

                            </tr>
                        </table>
                    </div>
                    <div className="rowBox alignTop">
                        <table>
                            <tr>
                                <th>Passes:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.passes} </td>)}

                            </tr>
                            <tr>
                                <th>Pass Accuracy:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.passAccuracy} </td>)}

                            </tr>
                            <tr>
                                <th>Red Cards:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.redCards} </td>)}

                            </tr>
                            <tr>
                                <th>Yellow Cards:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.yellowCards} </td>)}

                            </tr>
                        </table>
                    </div>
                </div>

            </div>

            <div id='goalkeeperplayerBio' className='playerInfoSection'>
                {playerInfo.map((playersData, index) => <h1>{`${playersData.firstName} ${playersData.lastName}`}</h1>)}
                <div className="teamStats">

                    <div className="rowBox alignCenterTop minWidth250">
                        {playerInfo.map((playersData, index) => <img src={playersData.photoUrl} alt="teamLogo" className='playerProfileImage'></img>)}
                    </div>
                    <div className='rowBox alignTop'>
                        <table>
                            <tr>
                                <th>Name:</th>
                                {playerInfo.map((playersData, index) => <td>{`${playersData.firstName} ${playersData.lastName}`}</td>)}
                            </tr>
                            <tr>
                                <th>Age:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.age}</td>)}
                            </tr>
                            <tr>
                                <th>Position:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.position}</td>)}
                            </tr>
                            <tr>
                                <th>Team:</th>
                                {playerInfo.map((playersData, index) => <td id="teamCell" onClick={(e) => gotoTeam(`${playersData.teamId}`)}>{playersData.team}</td>)}
                            </tr>

                            <tr>
                                <th>Rating:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.rating} </td>)}
                            </tr>

                        </table>
                    </div>
                    <div className="rowBox alignTop">
                        <table>
                            <tr>
                                <th>Goals:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.goals} </td>)}

                            </tr>
                            <tr>
                                <th>Assists:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.assists} </td>)}

                            </tr>
                            <tr>
                                <th>Penalties Scored:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.penaltiesScored} </td>)}

                            </tr>
                            <tr>
                                <th>Shots:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.shots} </td>)}

                            </tr>
                            <tr>
                                <th>Shots On Target:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.shotsOnTarget} </td>)}

                            </tr>
                        </table>
                    </div>
                    <div className="rowBox alignTop">
                        <table>
                            <tr>
                                <th>Matches Played:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.matchesPlayed} </td>)}

                            </tr>
                            <tr>
                                <th>Passes:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.passes} </td>)}

                            </tr>
                            <tr>
                                <th>Pass Accuracy:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.passAccuracy} </td>)}

                            </tr>
                            <tr>
                                <th>Red Cards:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.redCards} </td>)}

                            </tr>
                            <tr>
                                <th>Yellow Cards:</th>
                                {playerInfo.map((playersData, index) => <td>{playersData.yellowCards} </td>)}

                            </tr>
                        </table>
                    </div>
                </div>


            </div>

            <br></br>
            <br></br>
        </div>
    )
}

export default Player;
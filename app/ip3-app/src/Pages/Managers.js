import { useEffect, useState } from 'react';
import Api from '../Helpers/Api';
import SearchBar from "../Component/SearchBar";
import managerImage from "../images/managerImage.webp";
import { useSearchParams } from "react-router-dom";

function Managers() {
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
                if (playerName == "") {
                    disablePlayerSelection()
                }
                setPlayers(data)
                //console.log(data)
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
                disablePlayerSelection();
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



    /*
function hidePlayerBio() {
    const playerBio = document.getElementById("playerBio");
    playerBio.style.display = "none";
}
*/

    /*
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
*/

    document.addEventListener('click', function (event) {
        const searchBar = document.getElementsByClassName('searchBar')[0];
        const outsideClick = !searchBar.contains(event.target);
        if (outsideClick) disablePlayerSelection();
        else if (playerName != "") enablePlayerSelection();
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

    const gotoTeam = (teamId) => {
        window.location = `/team?id=${teamId}`;
    }

    return (
        <div className="Players">
            <div className="backgroundImage">
                <img src={managerImage} alt="teamPageImage" className="teamPageImage"></img>
                <div class="backgroundOverlay"></div>
                <div class="pageHeaderBox"><h1>Manager Search</h1></div>
                <br></br>
            </div>

            <div className="searchBarArea">
                <SearchBar keyword={playerName} placeholders={"Please Enter Managers Name"} onChange={setPlayerName} fun={searchPlayer} />

                <div id='playerSelection'>
                    <table className="playerTable sortable">
                        <tbody>

                            {players.map((playersData, index) =>
                                <tr key={index} onClick={(e) => showDetail(`${playersData.id}`, `${playersData.positionType}`)}>
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

            <div id="message">Search to view manager information.</div>


            <div id='attackerplayerBio'>

                <div className="teamInfo">
                    <div className="teamBio">
                        {playerInfo.map((playersData, index) => <h1>{`${playersData.firstName} ${playersData.lastName}`} Bio (Attackers Bio)</h1>)}
                        <div className="rowBox">
                            {playerInfo.map((playersData, index) => <img src={playersData.photoUrl} alt="teamLogo"></img>)}
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
                    </div>
                </div>

                <div className="teamStats">
                    <div className="statsBox">
                        <h2>Season Stats</h2>
                        <div className="rowBox">
                            <table>
                                <tr>
                                    <th>goals:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.goals} </td>)}

                                </tr>
                                <tr>
                                    <th>assists:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.assists} </td>)}

                                </tr>
                                <tr>
                                    <th>penaltiesScored:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.penaltiesScored} </td>)}

                                </tr>
                                <tr>
                                    <th>shots:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.shots} </td>)}

                                </tr>
                                <tr>
                                    <th>shotsOnTarget:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.shotsOnTarget} </td>)}

                                </tr>
                            </table>
                        </div>
                    </div>

                    <div className="statsBox">
                        <h2>Season Stats</h2>
                        <div className="rowBox">
                            <table>
                                <tr>
                                    <th>matchesPlayed:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.matchesPlayed} </td>)}

                                </tr>
                                <tr>
                                    <th>passes:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.passes} </td>)}

                                </tr>
                                <tr>
                                    <th>passAccuracy:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.passAccuracy} </td>)}

                                </tr>
                                <tr>
                                    <th>redCards:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.redCards} </td>)}

                                </tr>
                                <tr>
                                    <th>yellowCards:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.yellowCards} </td>)}

                                </tr>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

            <div id='midfielderplayerBio'>
                <div className="teamInfo">
                    <div className="teamBio">
                        {playerInfo.map((playersData, index) => <h1>{`${playersData.firstName} ${playersData.lastName}`} Bio (Midfielder Bio)</h1>)}
                        <div className="rowBox">
                            {playerInfo.map((playersData, index) => <img src={playersData.photoUrl} alt="teamLogo"></img>)}
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
                    </div>
                </div>

                <div className="teamStats">
                    <div className="statsBox">
                        <h2>Season Stats</h2>
                        <div className="rowBox">
                            <table>
                                <tr>
                                    <th>goals:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.goals} </td>)}

                                </tr>
                                <tr>
                                    <th>assists:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.assists} </td>)}

                                </tr>
                                <tr>
                                    <th>penaltiesScored:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.penaltiesScored} </td>)}

                                </tr>
                                <tr>
                                    <th>shots:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.shots} </td>)}

                                </tr>
                                <tr>
                                    <th>shotsOnTarget:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.shotsOnTarget} </td>)}

                                </tr>
                            </table>
                        </div>
                    </div>

                    <div className="statsBox">
                        <h2>Season Stats</h2>
                        <div className="rowBox">
                            <table>
                                <tr>
                                    <th>matchesPlayed:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.matchesPlayed} </td>)}

                                </tr>
                                <tr>
                                    <th>passes:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.passes} </td>)}

                                </tr>
                                <tr>
                                    <th>passAccuracy:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.passAccuracy} </td>)}

                                </tr>
                                <tr>
                                    <th>redCards:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.redCards} </td>)}

                                </tr>
                                <tr>
                                    <th>yellowCards:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.yellowCards} </td>)}

                                </tr>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

            <div id='defenderplayerBio'>
                <div className="teamInfo">
                    <div className="teamBio">
                        {playerInfo.map((playersData, index) => <h1>{`${playersData.firstName} ${playersData.lastName}`} Bio (Defenders Bio)</h1>)}
                        <div className="rowBox">
                            {playerInfo.map((playersData, index) => <img src={playersData.photoUrl} alt="teamLogo"></img>)}
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
                    </div>
                </div>

                <div className="teamStats">
                    <div className="statsBox">
                        <h2>Season Stats</h2>
                        <div className="rowBox">
                            <table>
                                <tr>
                                    <th>goals:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.goals} </td>)}

                                </tr>
                                <tr>
                                    <th>assists:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.assists} </td>)}

                                </tr>
                                <tr>
                                    <th>penaltiesScored:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.penaltiesScored} </td>)}

                                </tr>
                                <tr>
                                    <th>shots:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.shots} </td>)}

                                </tr>
                                <tr>
                                    <th>shotsOnTarget:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.shotsOnTarget} </td>)}

                                </tr>
                            </table>
                        </div>
                    </div>

                    <div className="statsBox">
                        <h2>Season Stats</h2>
                        <div className="rowBox">
                            <table>
                                <tr>
                                    <th>matchesPlayed:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.matchesPlayed} </td>)}

                                </tr>
                                <tr>
                                    <th>passes:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.passes} </td>)}

                                </tr>
                                <tr>
                                    <th>passAccuracy:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.passAccuracy} </td>)}

                                </tr>
                                <tr>
                                    <th>redCards:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.redCards} </td>)}

                                </tr>
                                <tr>
                                    <th>yellowCards:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.yellowCards} </td>)}

                                </tr>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

            <div id='goalkeeperplayerBio'>
                <div className="teamInfo">
                    <div className="teamBio">
                        {playerInfo.map((playersData, index) => <h1>{`${playersData.firstName} ${playersData.lastName}`} Bio (Goalkeepers Bio)</h1>)}
                        <div className="rowBox">
                            {playerInfo.map((playersData, index) => <img src={playersData.photoUrl} alt="teamLogo"></img>)}
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
                    </div>
                </div>

                <div className="teamStats">
                    <div className="statsBox">
                        <h2>Season Stats</h2>
                        <div className="rowBox">
                            <table>
                                <tr>
                                    <th>goals:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.goals} </td>)}

                                </tr>
                                <tr>
                                    <th>assists:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.assists} </td>)}

                                </tr>
                                <tr>
                                    <th>penaltiesScored:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.penaltiesScored} </td>)}

                                </tr>
                                <tr>
                                    <th>shots:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.shots} </td>)}

                                </tr>
                                <tr>
                                    <th>shotsOnTarget:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.shotsOnTarget} </td>)}

                                </tr>
                            </table>
                        </div>
                    </div>

                    <div className="statsBox">
                        <h2>Season Stats</h2>
                        <div className="rowBox">
                            <table>
                                <tr>
                                    <th>matchesPlayed:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.matchesPlayed} </td>)}

                                </tr>
                                <tr>
                                    <th>passes:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.passes} </td>)}

                                </tr>
                                <tr>
                                    <th>passAccuracy:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.passAccuracy} </td>)}

                                </tr>
                                <tr>
                                    <th>redCards:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.redCards} </td>)}

                                </tr>
                                <tr>
                                    <th>yellowCards:</th>
                                    {playerInfo.map((playersData, index) => <td>{playersData.yellowCards} </td>)}

                                </tr>
                            </table>
                        </div>
                    </div>
                </div>


            </div>

            <br></br>
            <br></br>
        </div>
    )
}

export default Managers;
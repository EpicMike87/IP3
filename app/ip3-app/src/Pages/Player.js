import { useEffect, useState } from 'react';
import Api from '../Helpers/Api';
import SearchBar from "../Component/SearchBar";
import playerImage from "../images/playerImage.jpg";
import { useSearchParams } from "react-router-dom";
import PieChart from '../Component/PieChart';

function Player() {
    const [playerName, setPlayerName] = useState("");
    const [players, setPlayers] = useState([]);
    const [playerInfo, setPlayerInfo] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const [showElement, setShowElement] = useState(false);
    const [bioType, setBioType] = useState()
    const [teamPhoto, setTeamPhoto] = useState(""); 


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
                getTeamImage(res.data[0].team)
                showPlayerBio(playerPositionType);
            })
            .catch(err => {
                console.log(err);
            });

    }

    const getTeamImage = (teamName) => {
        Api.get(`/team/${teamName}`)
        .then(res => {
            // console.log(res.data.photoUrl);
            setTeamPhoto(res.data.photoUrl);
            
        })
        .catch(err => {
            console.log(err);
        });
    }


    const mapPlayerBioData = (positionType) => {

        showPlayerBio(positionType);

    }

    const showPlayerBio = (playerPositionType) => {

        console.log(playerPositionType)

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
            case "Goalkeeper":

                attackerplayerBio.style.display = "none";
                midfielderplayerBio.style.display = "none";
                defenderplayerBio.style.display = "none";
                goalkeeperplayerBio.style.display = "block";
                pageMessage.style.display = "none";

                break;
            default:

                attackerplayerBio.style.display = "none";
                midfielderplayerBio.style.display = "none";
                defenderplayerBio.style.display = "none";
                goalkeeperplayerBio.style.display = "none";
                pageMessage.style.display = "block";
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

        <main className="Players" >
            <div className="backgroundImage" role="banner">
                <img src={playerImage} alt="teamPageImage" className="teamPageImage"></img>
                <div class="backgroundOverlay"></div>
                <div class="pageHeaderBox" role="heading"><h1>Player Search</h1></div>
                <br></br>
            </div>

            <div className="searchBarArea" role="search">
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

            <div id="message" >Search to view player information.</div>

            {playerInfo.map((playersData, index) =>
                <body onLoad={(e) => mapPlayerBioData(`${playersData.positionType}`)} >

                    <section id='attackerplayerBio' className='playerInfoSection' >
                        <div className="playerStats">
                            <div className="playerStatsImg">
                                {playerInfo.map(player => <img src={player.photoUrl} alt="playerPic" className='playerStatsProfImg'></img>)}
                                {playerInfo.map(player => <ul>
                                    <li><h1>{`${player.firstName} ${player.lastName}`}</h1></li>
                                    <li><h2 >{`${player.position}`}</h2></li>
                                    <li><p >{`${player.age}`}</p></li>
                                    <li>
                                        <div className='playerStatTeamLogo'>
                                            <img src={teamPhoto} alt="teamLogo" className='playerStatsTeamImg'/>
                                                {playerInfo.map(player => 
                                                    <h2>{`${player.team}`}</h2>
                                                )}
                                        </div>
                                    </li>
                                    </ul>)}
                                    {playerInfo.map(player => 
                                        <div className='playerStatsCircles'>
                                        <div style={{marginRight: '30px'}}>
                                            <h2>Rating</h2>
                                            <div className='topPlayerCircleP'>
                                                {player.rating.toFixed(2)}
                                            </div>
                                        </div>
                                        <div>
                                            <h2>Goals</h2>
                                            <div className='topPlayerCircleP'>
                                                {player.goals}
                                            </div>
                                        </div>
                                        <div style={{marginLeft: '30px'}}>
                                            <h2>Assists</h2>
                                            <div className='topPlayerCircleP'>
                                                {player.assists}
                                            </div>
                                        </div>
                                        
                                        </div>
                                        )}
                            </div>
                            {playerInfo.map(player => 
                                <div className='playerStatsSection'>
                                    <div className='playerStatsBox'>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                            <p style={{fontWeight: "bold"}}>Appearences</p>
                                            <p>{player.matchesPlayed}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                            <p style={{fontWeight: "bold"}}>Fouls</p>
                                            <p>{player.foulsCommitted}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                            <p style={{fontWeight: "bold"}}>Yellow Cards</p>
                                            <p>{player.yellowCards}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                            <p style={{fontWeight: "bold"}}>Red Cards</p>
                                            <p>{player.redCards}</p>
                                        </div>

                                    </div>
                                    <div className='playerStatsBox'>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>Shots</p>
                                                <p>{player.shots}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>On Target</p>
                                                <p>{player.shotsOnTarget}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>Passes</p>
                                                <p>{player.passes}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>Pass Acc.</p>
                                                <p>{player.passAccuracy}%</p>
                                        </div>
                                    </div>
                                    <div className='playerStatsBox'>
                                        <div style={{display: "flex ", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>Dribbles Att.</p>
                                                <p>{player.dribblesAttempted}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>Dribbles Succ.</p>
                                                <p>{player.successfulDribbles}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>PK Taken</p>
                                                <p>{player.penaltiesTaken}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>PK Scored</p>
                                                <p>{player.penaltiesScored}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div style={{display: "flex", width: "100%", maxHeight: '350px'}}>
                                {playerInfo.map(player => <PieChart player={player} />)}
                            </div>
                        </div>
                    </section>

                    <section id='midfielderplayerBio' className='playerInfoSection'>
                        <div className="playerStats">
                            <div className="playerStatsImg">
                                {playerInfo.map(player => <img src={player.photoUrl} alt="playerPic" className='playerStatsProfImg'></img>)}
                                {playerInfo.map(player => <ul>
                                    <li><h1>{`${player.firstName} ${player.lastName}`}</h1></li>
                                    <li><h2 >{`${player.position}`}</h2></li>
                                    <li><p >{`${player.age}`}</p></li>
                                    <li>
                                        <div className='playerStatTeamLogo'>
                                            <img src={teamPhoto} alt="teamLogo" className='playerStatsTeamImg'/>
                                                {playerInfo.map(player => 
                                                    <h2>{`${player.team}`}</h2>
                                                )}
                                        </div>
                                    </li>
                                    </ul>)}
                                    {playerInfo.map(player => 
                                        <div className='playerStatsCircles'>
                                        <div style={{marginRight: '30px'}}>
                                            <h2>Rating</h2>
                                            <div className='topPlayerCircleP'>
                                                {player.rating.toFixed(2)}
                                            </div>
                                        </div>
                                        <div>
                                            <h2>Goals</h2>
                                            <div className='topPlayerCircleP'>
                                                {player.goals}
                                            </div>
                                        </div>
                                        <div style={{marginLeft: '30px'}}>
                                            <h2>Assists</h2>
                                            <div className='topPlayerCircleP'>
                                                {player.assists}
                                            </div>
                                        </div>
                                        
                                        </div>
                                        )}
                            </div>
                            {playerInfo.map(player => 
                                <div className='playerStatsSection'>
                                    <div className='playerStatsBox'>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                            <p style={{fontWeight: "bold"}}>Appearences</p>
                                            <p>{player.matchesPlayed}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                            <p style={{fontWeight: "bold"}}>Fouls</p>
                                            <p>{player.foulsCommitted}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                            <p style={{fontWeight: "bold"}}>Yellow Cards</p>
                                            <p>{player.yellowCards}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                            <p style={{fontWeight: "bold"}}>Red Cards</p>
                                            <p>{player.redCards}</p>
                                        </div>

                                    </div>
                                    <div className='playerStatsBox'>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>Shots</p>
                                                <p>{player.shots}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>On Target</p>
                                                <p>{player.shotsOnTarget}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>Passes</p>
                                                <p>{player.passes}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>Pass Acc.</p>
                                                <p>{player.passAccuracy}%</p>
                                        </div>
                                    </div>
                                    <div className='playerStatsBox'>
                                        <div style={{display: "flex ", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>Dribbles Att.</p>
                                                <p>{player.dribblesAttempted}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>Dribbles Succ.</p>
                                                <p>{player.successfulDribbles}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>PK Taken</p>
                                                <p>{player.penaltiesTaken}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>PK Scored</p>
                                                <p>{player.penaltiesScored}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div style={{display: "flex", width: "100%", maxHeight: '350px'}}>
                                {playerInfo.map(player => <PieChart player={player} />)}
                            </div>
                        </div>
                    </section>

                    <section id='defenderplayerBio' className="playerInfoSection">
                        <div className="playerStats">
                            <div className="playerStatsImg">
                                {playerInfo.map(player => <img src={player.photoUrl} alt="playerPic" className='playerStatsProfImg'></img>)}
                                {playerInfo.map(player => 
                                <ul>
                                    <li><h1>{`${player.firstName} ${player.lastName}`}</h1></li>
                                    <li><h2 >{`${player.position}`}</h2></li>
                                    <li><p >{`${player.age}`}</p></li>
                                    <li>
                                        <div className='playerStatTeamLogo'>
                                            <img src={teamPhoto} alt="teamLogo" className='playerStatsTeamImg'/>
                                                {playerInfo.map(player => 
                                                    <h2>{`${player.team}`}</h2>
                                                )}
                                        </div>
                                    </li>
                                </ul>)}
                                    {playerInfo.map(player => 
                                        <div className='playerStatsCircles'>
                                            <div style={{marginRight: '30px'}}>
                                                <h2>Rating</h2>
                                                <div className='topPlayerCircleP'>
                                                    {player.rating.toFixed(2)}
                                                </div>
                                            </div>
                                            <div>
                                                <h2>Blocks</h2>
                                                <div className='topPlayerCircleP'>
                                                    {player.blocks}
                                                </div>
                                            </div>
                                            <div style={{marginLeft: '30px'}}>
                                                <h2>Intercept</h2>
                                                <div className='topPlayerCircleP'>
                                                    {player.interceptions}
                                                </div>
                                            </div>
                                        </div>
                                        )}
                            </div>
                            {playerInfo.map(player => 
                                <div className='playerStatsSection'>
                                    <div className='playerStatsBox'>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                            <p style={{fontWeight: "bold"}}>Appearences</p>
                                            <p>{player.matchesPlayed}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                            <p style={{fontWeight: "bold"}}>Fouls</p>
                                            <p>{player.foulsCommitted}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                            <p style={{fontWeight: "bold"}}>Yellow Cards</p>
                                            <p>{player.yellowCards}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                            <p style={{fontWeight: "bold"}}>Red Cards</p>
                                            <p>{player.redCards}</p>
                                        </div>

                                    </div>
                                    <div className='playerStatsBox'>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>Shots</p>
                                                <p>{player.shots}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>On Target</p>
                                                <p>{player.shotsOnTarget}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>Passes</p>
                                                <p>{player.passes}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>Pass Acc.</p>
                                                <p>{player.passAccuracy}%</p>
                                        </div>
                                    </div>
                                    <div className='playerStatsBox'>
                                        <div style={{display: "flex ", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap", }}>
                                                <p style={{fontWeight: "bold"}}>Dribbles Att.</p>
                                                <p>{player.dribblesAttempted}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>Dribbles Succ.</p>
                                                <p>{player.successfulDribbles}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>PK Taken</p>
                                                <p>{player.penaltiesTaken}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>PK Scored</p>
                                                <p>{player.penaltiesScored}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div style={{display: "flex", width: "100%", maxHeight: '350px'}}>
                                {playerInfo.map(player => <PieChart player={player} />)}
                            </div>
                        </div>

                    </section>

                    <section id='goalkeeperplayerBio' className='playerInfoSection'>
                        <div className="playerStats">
                            <div className="playerStatsImg">
                                {playerInfo.map(player => <img src={player.photoUrl} alt="playerPic" className='playerStatsProfImg'></img>)}
                                {playerInfo.map(player => <ul>
                                    <li><h1>{`${player.firstName} ${player.lastName}`}</h1></li>
                                    <li><h2 >{`${player.position}`}</h2></li>
                                    <li><p >{`${player.age}`}</p></li>
                                    <li>
                                        <div className='playerStatTeamLogo'>
                                            <img src={teamPhoto} alt="teamLogo" className='playerStatsTeamImg'/>
                                                {playerInfo.map(player => 
                                                    <h2>{`${player.team}`}</h2>
                                                )}
                                        </div>
                                    </li>
                                    </ul>)}
                                    {playerInfo.map(player => 
                                        <div className='playerStatsCircles'>
                                        <div style={{marginRight: '30px'}}>
                                            <h2>Rating</h2>
                                            <div className='topPlayerCircleP'>
                                                {player.rating.toFixed(2)}
                                            </div>
                                        </div>
                                        <div>
                                            <h2>Saves</h2>
                                            <div className='topPlayerCircleP'>
                                                {player.saves}
                                            </div>
                                        </div>
                                        <div style={{marginLeft: '30px'}}>
                                            <h2>Conceded</h2>
                                            <div className='topPlayerCircleP'>
                                                {player.goalsConceded}
                                            </div>
                                        </div>
                                        
                                        </div>
                                        )}
                            </div>
                            {playerInfo.map(player => 
                                <div className='playerStatsSection'>
                                    <div className='playerStatsBox'>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                            <p style={{fontWeight: "bold"}}>Appearences</p>
                                            <p>{player.matchesPlayed}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                            <p style={{fontWeight: "bold"}}>Fouls</p>
                                            <p>{player.foulsCommitted}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                            <p style={{fontWeight: "bold"}}>Yellow Cards</p>
                                            <p>{player.yellowCards}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                            <p style={{fontWeight: "bold"}}>Red Cards</p>
                                            <p>{player.redCards}</p>
                                        </div>

                                    </div>
                                    <div className='playerStatsBox'>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>Dribbles Att.</p>
                                                <p>{player.dribblesAttempted}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>Dribbles Succ.</p>
                                                <p>{player.successfulDribbles}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>Passes</p>
                                                <p>{player.passes}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>Pass Acc.</p>
                                                <p>{player.passAccuracy}%</p>
                                        </div>
                                    </div>
                                    <div className='playerStatsBox'>
                                        <div style={{display: "flex ", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>Saves</p>
                                                <p>{player.saves}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>Conceded</p>
                                                <p>{player.goalsConceded}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>Duels</p>
                                                <p>{player.duels}</p>
                                        </div>
                                        <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between', columnGap: "10%", whiteSpace: "nowrap"}}>
                                                <p style={{fontWeight: "bold"}}>Duels Won</p>
                                                <p>{player.duelsWon}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div style={{display: "flex", width: "100%", maxHeight: '350px'}}>
                                {playerInfo.map(player => <PieChart player={player} />)}
                            </div>
                        </div>
                    </section>
                </body>
            )}
        </main>
    )
}

export default Player;
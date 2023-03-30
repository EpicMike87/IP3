import { React, useState, useEffect } from "react";
import SearchBar from "../Component/SearchBar";
import Api from '../Helpers/Api';
import teamImage from "../images/teamImage.jpg";
import { useSearchParams } from "react-router-dom";

function Teams() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [team, setTeam] = useState("");
    const [teamData, setTeamData,] = useState("");
    const [players, setPlayers] = useState([]);
    const [teamStats, setTeamStats] = useState()
    const [teamHomeStats, setTeamHomeStats] = useState()
    const [teamAwayStats, setTeamAwayStats] = useState()
    const [teamGrounds, setTeamGrounds] = useState()

    const [nameOfTeam, setTeamName] = useState("")
    const [rankOfTeam, setTeamRank] = useState("")
    const [logoOfTeam, setTeamLogo] = useState("")

    const [groundsCapacity, setGroundsCapacity] = useState("")
    const [groundsCity, setGroundsCity] = useState("")
    const [groundsName, setGroundsName] = useState("")
    const [groundsSurface, setGroundsSurface] = useState("")
    const [groundsAddress, setGroundsAddress] = useState("")
    const [groundsImage, setGroundsImage] = useState("")


    const [season, setSeason] = useState("")
    const [points, setPoints] = useState("")
    const [matchesPlayed, setMatchesPlayed] = useState("")
    const [matchesWon, setMatchesWon] = useState("")
    const [matchesLost, setMatchesLost] = useState("")
    const [matchesDrew, setMatchesDrew] = useState("")
    const [goalDifference, setGoalDifference] = useState("")
    const [goalsFor, setGoalsFor] = useState("")
    const [goalsAgainst, setGoalsAgainst] = useState("")

    const [homePoints, setHomePoints] = useState("")
    const [homeMatchesPlayed, setHomeMatchesPlayed] = useState("")
    const [homeMatchesWon, setHomeMatchesWon] = useState("")
    const [homeMatchesLost, setHomeMatchesLost] = useState("")
    const [homeMatchesDrew, setHomeMatchesDrew] = useState("")
    const [homeGoalDifference, setHomeGoalDifference] = useState("")
    const [homeGoalsFor, setHomeGoalsFor] = useState("")
    const [homeGoalsAgainst, setHomeGoalsAgainst] = useState("")

    const [awayPoints, setAwayPoints] = useState("")
    const [awayMatchesPlayed, setAwayMatchesPlayed] = useState("")
    const [awayMatchesWon, setAwayMatchesWon] = useState("")
    const [awayMatchesLost, setAwayMatchesLost] = useState("")
    const [awayMatchesDrew, setAwayMatchesDrew] = useState("")
    const [awayGoalDifference, setAwayGoalDifference] = useState("")
    const [awayGoalsFor, setAwayGoalsFor] = useState("")
    const [awayGoalsAgainst, setAwayGoalsAgainst] = useState("")

    useEffect(()=>{
        const teamId = searchParams.get("id");
        if(teamId != null){
            searchTeamById(teamId);
        }
     }, [])
     

     const searchTeamById = (id) => {
        Api.get(`/team/id/${id}`)
        .then(res => {
            console.log(res.data);
            setTeamData(res.data);
            setPlayers(res.data.players);
            console.log(players);
            mapTeamData(res.data)
            mapTeamStats(res.data.allStats)
            mapTeamHomeStats(res.data.homeStats)
            mapTeamAwayStats(res.data.awayStats)
            mapTeamGrounds(res.data.grounds)
            const playerSection = document.getElementsByClassName('playerSection')[0];
            const message = document.getElementById('message');
            message.style.display = 'none';
            playerSection.style.display = 'flex';

        })
        .catch(err => {
            console.log(err);
        });
     }


    const searchTeam = () => {
        Api.get(`/team/${team}`)
            .then(res => {
                console.log(res.data);
                setTeamData(res.data);
                setPlayers(res.data.players);
                console.log(players);
                mapTeamData(res.data)
                mapTeamStats(res.data.allStats)
                mapTeamHomeStats(res.data.homeStats)
                mapTeamAwayStats(res.data.awayStats)
                mapTeamGrounds(res.data.grounds)
                const playerSection = document.getElementsByClassName('playerSection')[0];
                const message = document.getElementById('message');
                message.style.display = 'none';
                playerSection.style.display = 'flex';

            })
            .catch(err => {
                console.log(err);
            });
    }

    const mapTeamData = (data) => {
        setTeamStats(Object.keys(data).forEach(function (key, index) {

            setTeamName(data.teamName)
            setTeamRank(data.rank)
            setTeamLogo(data.photoUrl)

        }))
    }

    const mapTeamGrounds = (data) => {
        setTeamGrounds(Object.keys(data).forEach(function (key, index) {

            setGroundsCapacity(data.capacity)
            setGroundsCity(data.city)
            setGroundsName(data.name)
            setGroundsImage(data.photoUrl)
            setGroundsAddress(data.address)
            //Capitalise first letter
            setGroundsSurface(data.surface.charAt(0).toUpperCase() + data.surface.slice(1))

        }))
    }

    const mapTeamStats = (data) => {
        setTeamStats(Object.keys(data).forEach(function (key, index) {

            setSeason(data.season)
            setPoints(data.points)
            setMatchesPlayed(data.matchesPlayed)
            setMatchesWon(data.matchesWon)
            setMatchesLost(data.matchesLost)
            setMatchesDrew(data.matchesDrew)
            setGoalDifference(data.goalDifference)
            setGoalsFor(data.goalsFor)
            setGoalsAgainst(data.goalsAgainst)

        }))
    }

    const mapTeamHomeStats = (data) => {
        setTeamHomeStats(Object.keys(data).forEach(function (key, index) {

            setHomePoints(data.points)
            setHomeMatchesPlayed(data.matchesPlayed)
            setHomeMatchesWon(data.matchesWon)
            setHomeMatchesLost(data.matchesLost)
            setHomeMatchesDrew(data.matchesDrew)
            setHomeGoalDifference(data.goalDifference)
            setHomeGoalsFor(data.goalsFor)
            setHomeGoalsAgainst(data.goalsAgainst)

        }))
    }

    const mapTeamAwayStats = (data) => {
        setTeamAwayStats(Object.keys(data).forEach(function (key, index) {

            setAwayPoints(data.points)
            setAwayMatchesPlayed(data.matchesPlayed)
            setAwayMatchesWon(data.matchesWon)
            setAwayMatchesLost(data.matchesLost)
            setAwayMatchesDrew(data.matchesDrew)
            setAwayGoalDifference(data.goalDifference)
            setAwayGoalsFor(data.goalsFor)
            setAwayGoalsAgainst(data.goalsAgainst)

        }))
    }

    const updateTeam = (team) => {
        setTeam(team);
    }

    const gotoPlayer = (id) =>{
        window.location = `/player?id=${id}`
    }

    return (
        <div className="Team">

            <div className="backgroundImage">
                <img src={teamImage} alt="teamPageImage" className="teamPageImage"></img>
                <div class="backgroundOverlay"></div>
                <div class="pageHeaderBox"><h1>Team Search</h1></div>
                <br></br>
            </div>

            <div className="searchBarArea">
                <SearchBar keyword={team} placeholders={"Please Enter Team Name"} onChange={updateTeam} fun={searchTeam} />
            </div>
            <div id="message">Search to view team information.</div>
            <div className="playerSection">
                <div className="teamInfo">
                    <div className="teamBio">
                        <h2>Team Bio</h2>
                        <div className="rowBox">
                            <img src={logoOfTeam} alt="teamLogo"></img>
                            <table>
                                <tr>
                                    <th>Team Name:</th>
                                    <td>{nameOfTeam}</td>
                                </tr>
                                <tr>
                                    <th>Home City:</th>
                                    <td>{groundsCity}</td>
                                </tr>
                                <tr>
                                    <th>League Position:</th>
                                    <td>{rankOfTeam}</td>
                                </tr>
                                <tr>
                                    <th>Grounds:</th>
                                    <td>{groundsName}</td>
                                </tr>
                                <tr>
                                    <th>City:</th>
                                    <td>{groundsCity}</td>
                                </tr>
                            </table>
                        </div>

                    </div>
                    <div className="groundsBio">
                        <h2>Grounds</h2>
                        <div className="rowBox">
                            <img src={groundsImage} alt="teamGrounds"></img>
                            <table>
                                <tr>
                                    <th>Name:</th>
                                    <td>{groundsName}</td>
                                </tr>
                                <tr>
                                    <th>City:</th>
                                    <td>{groundsCity}</td>
                                </tr>
                                <tr>
                                    <th>Address:</th>
                                    <td>{groundsAddress}</td>
                                </tr>
                                <tr>
                                    <th>Capacity:</th>
                                    <td>{groundsCapacity}</td>
                                </tr>
                                <tr>
                                    <th>Surface:</th>
                                    <td>{groundsSurface}</td>
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
                                    <th>Points:</th>
                                    <td>{points}</td>
                                </tr>
                                <tr>
                                    <th>Matches Played:</th>
                                    <td>{matchesPlayed}</td>
                                </tr>
                                <tr>
                                    <th>Won:</th>
                                    <td>{matchesWon}</td>
                                </tr>
                                <tr>
                                    <th>Lost:</th>
                                    <td>{matchesLost}</td>
                                </tr>
                                <tr>
                                    <th>Drew:</th>
                                    <td>{matchesDrew}</td>
                                </tr>
                                <tr>
                                    <th>Goal Difference:</th>
                                    <td>{goalDifference}</td>
                                </tr>
                                <tr>
                                    <th>Goals For:</th>
                                    <td>{goalsFor}</td>
                                </tr>
                                <tr>
                                    <th>Goals Against:</th>
                                    <td>{goalsAgainst}</td>
                                </tr>
                            </table>
                        </div>

                    </div>
                    <div className="statsBox">
                        <h2>Home Stats</h2>
                        <div className="rowBox">
                            <table>
                                <tr>
                                    <th>Points:</th>
                                    <td>{homePoints}</td>
                                </tr>
                                <tr>
                                    <th>Matches Played:</th>
                                    <td>{homeMatchesPlayed}</td>
                                </tr>
                                <tr>
                                    <th>Won:</th>
                                    <td>{homeMatchesWon}</td>
                                </tr>
                                <tr>
                                    <th>Lost:</th>
                                    <td>{homeMatchesLost}</td>
                                </tr>
                                <tr>
                                    <th>Drew:</th>
                                    <td>{homeMatchesDrew}</td>
                                </tr>
                                <tr>
                                    <th>Goal Difference:</th>
                                    <td>{homeGoalDifference}</td>
                                </tr>
                                <tr>
                                    <th>Goals For:</th>
                                    <td>{homeGoalsFor}</td>
                                </tr>
                                <tr>
                                    <th>Goals Against:</th>
                                    <td>{homeGoalsAgainst}</td>
                                </tr>
                            </table>
                        </div>

                    </div>
                    <div className="statsBox">
                        <h2>Away Stats</h2>
                        <div className="rowBox">
                            <table>
                                <tr>
                                    <th>Points:</th>
                                    <td>{awayPoints}</td>
                                </tr>
                                <tr>
                                    <th>Matches Played:</th>
                                    <td>{awayMatchesPlayed}</td>
                                </tr>
                                <tr>
                                    <th>Won:</th>
                                    <td>{awayMatchesWon}</td>
                                </tr>
                                <tr>
                                    <th>Lost:</th>
                                    <td>{awayMatchesLost}</td>
                                </tr>
                                <tr>
                                    <th>Drew:</th>
                                    <td>{awayMatchesDrew}</td>
                                </tr>
                                <tr>
                                    <th>Goal Difference:</th>
                                    <td>{awayGoalDifference}</td>
                                </tr>
                                <tr>
                                    <th>Goals For:</th>
                                    <td>{awayGoalsFor}</td>
                                </tr>
                                <tr>
                                    <th>Goals Against:</th>
                                    <td>{awayGoalsAgainst}</td>
                                </tr>
                            </table>
                        </div>

                    </div>
                </div>
                <div className="teamStats">
                    <div className="colBox">
                        <h2>Current Squad</h2>
                        <div id="tablecontainer">
                            <table id="playerTable" class="playerTable sortable">
                                <thead>
                                    <tr id="teampagerow">
                                        <th class="no-sort">Photo</th>
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>Position</th>
                                        <th id="#matchesPlayed">Matches Played</th>
                                        <th>Rating</th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody">
                                    {players.map((playersData, index) =>
                                        <tr key={index} onClick={(e) => gotoPlayer(`${playersData.id}`)}>
                                            <td><img src={playersData.photoUrl}></img></td>
                                            <td>{`${playersData.firstName} ${playersData.lastName}`}</td>
                                            <td>{playersData.age}</td>
                                            <td>{playersData.position}</td>
                                            <td>{playersData.matchesPlayed}</td>
                                            <td>{playersData.rating}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="teamStatsSection">
                    <br></br>
                    <div className="teamNLG">
                        <h3>NLG/Visual Data Placeholder</h3>
                    </div>
                    <br></br>

                </div>

            </div>

        </div>
    )
}

export default Teams;
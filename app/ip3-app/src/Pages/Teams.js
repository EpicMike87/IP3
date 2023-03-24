import { React, useState, useEffect } from "react";
import SearchBar from "../Component/SearchBar";
import Api from '../Helpers/Api';
import teamImage from "../images/teamImage.jpg";


function Teams() {
    const [team, setTeam] = useState("");
    const [teamData, setTeamData,] = useState("");
    const [players, setPlayers] = useState()
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


    const searchTeam = () => {
        Api.get(`/team/${team}`)
            .then(res => {
                console.log(res.data);
                setTeamData(res.data);
                mapPlayers(res.data.players);
                mapTeamData(res.data)
                mapTeamStats(res.data.allStats)
                mapTeamHomeStats(res.data.homeStats)
                mapTeamAwayStats(res.data.awayStats)
                mapTeamGrounds(res.data.grounds)


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

    const mapPlayers = (players) => {
        const table = document.getElementById('tableBody');
        table.innerHTML = "";
        setPlayers(players.map(player => {

            //Create table row and cells to display the info for player
            const newRow = document.createElement('tr');
            const playerPhotoCell = document.createElement('td');
            const playerName = document.createElement('td');
            const playerTeam = document.createElement('td');
            const playerMatchesPlayed = document.createElement('td');
            const playerShotsOnTarget = document.createElement('td');
            const playerGoals = document.createElement('td');
            const playerAssists = document.createElement('td');

            //Create the img element to use in player photo cell and add url (src attribute), add in to cell
            const playerPhoto = document.createElement('img');
            playerPhoto.src = player.photoUrl;
            playerPhotoCell.className = 'photo';
            playerPhotoCell.appendChild(playerPhoto);

            //Add the rest of the data to their cells
            playerName.innerText = `${player.firstName} ${player.lastName}`;
            playerTeam.innerText = player.team;
            playerMatchesPlayed.innerText = player.matchesPlayed;
            playerShotsOnTarget.innerText = player.shotsOnTarget ? player.shotsOnTarget : 0;
            playerGoals.innerText = player.goals ? player.goals : 0;
            playerAssists.innerText = player.assists ? player.assists : 0;

            //Add cells to row
            newRow.appendChild(playerPhotoCell);
            newRow.appendChild(playerName);
            newRow.appendChild(playerTeam)
            newRow.appendChild(playerMatchesPlayed);
            newRow.appendChild(playerShotsOnTarget);
            newRow.appendChild(playerGoals);
            newRow.appendChild(playerAssists);

            //Add row to table
            table.appendChild(newRow);


        }))
    }

    const updateTeam = (team) => {
        setTeam(team);
    }

    return (
        <div className="Team">

            <div className="backgroundImage">
                <img src={teamImage} alt="teamPageImage" className="teamPageImage"></img>
                <br></br>
            </div>

            <div className="searchBarArea">
                <h1>This is the Team page</h1>
                <SearchBar keyword={team} placeholders={"Please Enter Team Name"} onChange={updateTeam} fun={searchTeam} />
            </div>

            <div className="playerSection">

                <div className="teamInfo">
                    <h2>Team Info</h2>
                    <h3>{nameOfTeam}</h3>
                    <h3>{groundsCity}</h3>
                    <h3>{rankOfTeam}</h3>
                    <img src={logoOfTeam} alt="teamLogo"></img>

                    <h2>Grounds Info</h2>
                    <h3>{groundsName}</h3>
                    <h3>{groundsCapacity}</h3>
                    <img src={groundsImage} alt="teamGrounds"></img>

                    <br></br>
                    <div className="teamGamePrediction">
                        <h3>Team Game Prediction Placeholder</h3>
                    </div>
                    <br></br>
                </div>

                <div className="teamStatsSection">

                    <div id="tablecontainer">
                        <br></br>
                        <h1>Seasons Stats</h1>
                        <table id="teamStatsTable">
                            <thead>
                                <tr>
                                    <th>Season</th>
                                    <th>Points</th>
                                    <th>Matches Played</th>
                                    <th>Matches Won</th>
                                    <th>Matches Lost</th>
                                    <th>Matches Drew</th>
                                    <th>Goal Difference</th>
                                    <th>Goals For</th>
                                    <th>Goals Against</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>{season}</th>
                                    <th>{points}</th>
                                    <th>{matchesPlayed}</th>
                                    <th>{matchesWon}</th>
                                    <th>{matchesLost}</th>
                                    <th>{matchesDrew}</th>
                                    <th>{goalDifference}</th>
                                    <th>{goalsFor}</th>
                                    <th>{goalsAgainst}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div id="tablecontainer">
                        <br></br>
                        <h1>Home Stats</h1>
                        <table id="teamHomeStatsTable">
                            <thead>
                                <tr>
                                    <th>Points</th>
                                    <th>Matches Played</th>
                                    <th>Matches Won</th>
                                    <th>Matches Lost</th>
                                    <th>Matches Drew</th>
                                    <th>Goal Difference</th>
                                    <th>Goals For</th>
                                    <th>Goals Against</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>{homePoints}</th>
                                    <th>{homeMatchesPlayed}</th>
                                    <th>{homeMatchesWon}</th>
                                    <th>{homeMatchesLost}</th>
                                    <th>{homeMatchesDrew}</th>
                                    <th>{homeGoalDifference}</th>
                                    <th>{homeGoalsFor}</th>
                                    <th>{homeGoalsAgainst}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div id="tablecontainer">
                        <br></br>
                        <h1>Away Stats</h1>
                        <table id="teamAwayStatsTable">
                            <thead>
                                <tr>
                                    <th>Points</th>
                                    <th>Matches Played</th>
                                    <th>Matches Won</th>
                                    <th>Matches Lost</th>
                                    <th>Matches Drew</th>
                                    <th>Goal Difference</th>
                                    <th>Goals For</th>
                                    <th>Goals Against</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>{awayPoints}</th>
                                    <th>{awayMatchesPlayed}</th>
                                    <th>{awayMatchesWon}</th>
                                    <th>{awayMatchesLost}</th>
                                    <th>{awayMatchesDrew}</th>
                                    <th>{awayGoalDifference}</th>
                                    <th>{awayGoalsFor}</th>
                                    <th>{awayGoalsAgainst}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <br></br>
                    <div className="teamNLG">
                        <h3>NLG/Visual Data Placeholder</h3>
                    </div>
                    <br></br>

                </div>

                <div className="teamPlayersSection">
                    <h1>Team Players</h1>
                    <br></br>
                    <div id="tablecontainer">
                        <table id="playerTable" class="scrolldown sortable">
                            <thead>
                                <tr>
                                    <th class="no-sort">Photo</th>
                                    <th>Name</th>
                                    <th>Team</th>
                                    <th id="#matchesPlayed">Matches Played</th>
                                    <th>Shots On Target</th>
                                    <th>Goals</th>
                                    <th>Assists</th>
                                </tr>
                            </thead>
                            <tbody id="tableBody">
                            </tbody>
                        </table>
                        <br></br>
                    </div>
                    <ul>
                        {players}
                    </ul>
                </div>

            </div>

        </div>
    )
}

export default Teams;
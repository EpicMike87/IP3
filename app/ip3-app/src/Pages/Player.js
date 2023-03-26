import { useState, useEffect } from "react";
import Api from '../Helpers/Api';
import SearchBar from "../Component/SearchBar";

function Player() {
    const [player, setPlayer] = useState("");
    const [players, setPlayers] = useState([]);
    const [test, setTest] = useState();

    const searchPlayer = () => {
        Api.get(`search-player/${player}`)
            .then(res => {
                console.log(res.data);
                setPlayers(res.data);
                mapPlayers(res.data);
                const playerSection = document.getElementsByClassName('playerSection')[0];
                playerSection.style.display = 'flex';
            })
            .catch(err => {
                console.log(err);
            });
    }

    const mapPlayers = (players) => {
        const table = document.getElementById('tableBody');
        table.innerHTML = "";
        setTest(players.map(player => {
            // Exclude goalkeepers as different stats
            if (!(player.position === "Goalkeeper")) {

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
            }

            // console.log(player.firstName);
            // return(<p>{player.firstName}</p>)
        }))
    }
    const updatePlayer = (player) => {
        setPlayer(player);
    }

    return (
        <div className="Player">
            <h1>This is the Player page</h1>
            <SearchBar keyword={player} placeholders={"Please Enter Player Name"} onChange={updatePlayer} fun={searchPlayer} />
            <div className="playerSection">
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
                </div>
                <ul>
                    {test}
                </ul>
            </div>
        </div>
    )
}

export default Player; 
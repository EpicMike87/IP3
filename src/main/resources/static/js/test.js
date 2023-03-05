
// Would be best drafting this into proper functions and using async await in actual implementation
// - Sean

window.onload = function () {
    const table = document.getElementById('tableBody');
    //Get data from API
    fetch('http://localhost:8080/players/attackers')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const players = data;
            // Sort players by goals scored. Can sort by any metric
            players.sort((a, b) => (a.goals > b.goals) ? -1 : 1)

            players.forEach(player => {

                // Exclude players that are not attacking pos as shots on target not recorded by system for anyone else and used in the table
                if (!(player.position == "Goalkeeper" || player.position == "Defender" || player.position == "Midfielder")) {

                    //Create table row and cells to display the info for player
                    const newRow = document.createElement('tr');
                    const playerPhotoCell = document.createElement('td');
                    const playerName = document.createElement('td');
                    const playerTeam = document.createElement('td');
                    const playerMatchesPlayed = document.createElement('td');
                    const playerShotsOnTarget = document.createElement('td');
                    const playerGoals = document.createElement('td');

                    //Create the img element to use in player photo cell and add url (src attribute), add in to cell
                    const playerPhoto = document.createElement('img');
                    playerPhoto.src = player.photoUrl;
                    playerPhotoCell.className = 'photo';
                    playerPhotoCell.appendChild(playerPhoto);

                    //Add the rest of the data to their cells
                    playerName.innerText = `${player.firstName} ${player.lastName}`;
                    playerTeam.innerText = player.team;
                    playerMatchesPlayed.innerText = player.matchesPlayed;
                    playerShotsOnTarget.innerText = player.shotsOnTarget;
                    playerGoals.innerText = player.goals;

                    //Add cells to row
                    newRow.appendChild(playerPhotoCell);
                    newRow.appendChild(playerName);
                    newRow.appendChild(playerTeam)
                    newRow.appendChild(playerMatchesPlayed);
                    newRow.appendChild(playerShotsOnTarget);
                    newRow.appendChild(playerGoals);

                    //Add row to table
                    table.appendChild(newRow);
                }
            });
        });
}
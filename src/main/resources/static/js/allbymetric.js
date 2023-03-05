
// Would be best drafting this into proper functions in actual implementation to be used across all filter options
// - Sean

let playerData;

async function loadData() {
    //Get data from API
    try {
        const response = await fetch('http://localhost:8080/players/all');
        if (!response.ok) {
            throw new error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        const players = data;
        // Sort players by sortBy value (has to match the exact metric name as exists in player obj). Can sort by any metric
        return players;
    }
    catch (error) {
        return error;
    }
}

function createTable(players, sortBy) {

    //Remove goalkeepers from list prior to sorting (as no goals stat)
    //Can have function in actual implementation that changes table labels based on
    //what stat is requested and filters players in results shown
    //For demo purposes players excl goalkeepers will do
    players.forEach(player => {
        if (player.position == "Goalkeeper") delete players[players.indexOf(player)];
    });

    //Sort list of players by chosen stat (does not work if attribute doesn't exist in player obj)
    players.sort((a, b) => (a[sortBy] > b[sortBy]) ? -1 : 1)

    //Get table and remove any existing data
    const table = document.getElementById('tableBody');
    table.innerHTML = "";
    players.forEach(player => {

        // Exclude players that are not attacking pos as shots on target not recorded by system for anyone else and used in the table
        if (!(player.position == "Goalkeeper")) {

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
    });
}

//Runs on page load
window.onload = function () {
    //Get data from API
    loadData().then(function (result) {
        playerData = result;
        //create table from results ordered by goals
        createTable(playerData, "goals");
    });
    //get stats selector obj and add event listener for change in selection
    const select = document.getElementById('selector');
    select.addEventListener('change', function (e) {
        //create table ordered by new values
        createTable(playerData, e.target.value);
    });
}



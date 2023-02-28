fetch('http://localhost:8080/team/celtic')
.then(response => response.json()) 
.then(data => {
    console.log(data);
    const players = data.players;
    console.log(players)
    players.sort((a, b) => (a.matchesPlayed > b.matchesPlayed) ? -1 : 1)
    players.forEach(player => {
        console.log(`${player.firstName}  ${player.lastName}`)
        console.log(`Matches Played: ${player.matchesPlayed}`)
    });
}); 
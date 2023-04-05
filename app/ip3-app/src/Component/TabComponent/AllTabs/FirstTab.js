import React from "react";
import { useState, useEffect } from "react";
import Api from '../../../Helpers/Api';
import pitchImage from "../../../images/pitch4.jpg";
import formations from '../../../data/formations.json';

const FirstTab = () => {

    const [player, setPlayer] = useState("");
    const [players, setPlayers] = useState([]);
    const [test, setTest] = useState();

    const searchPlayers = (formNo) => {
        Api.get(`players/all`)
            .then(res => {
                console.log(res.data);
                setPlayers(res.data);
                setUpField(res.data, formNo);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        let ignore = false;
        if (!ignore) {
            searchPlayers(433)
        }
        return () => { ignore = true; }
    }, []);

    const getFormation = (number) => {
        console.log(number)
        console.log(formations)
        console.log(formations.filter(a => a.formation == number)[0])
        return formations.filter(a => a.formation == number)[0].positions;
    }

    const changeFormation = (e) => {
        const number = parseInt(e.target.textContent);
        console.log(number)
        const pitch = document.getElementsByClassName('pitch')[0];
        const playerEles = pitch.getElementsByClassName('player');
        while (playerEles.length > 0) {
            playerEles[0].parentNode.removeChild(playerEles[0]);
        }
        searchPlayers(number);
    }

    const setUpField = (data, formNo) => {
        const topPlayers = findTopPerPos(data);
        const positions = [...getFormation(formNo)];
        const playerIcons = new Array();
        while (positions.length > 0) {
            const pos = positions.pop();
            const posPlayers = topPlayers.find(players => players.position == pos.position).players;
            const player = posPlayers.reverse().pop();
            const playerIcon = getPlayerIcon(player);
            playerIcon.style.left = pos.left;
            playerIcon.style.bottom = pos.bottom;
            playerIcon.appendChild(getMarkerEle(pos.marker));
            playerIcons.push(playerIcon);
        }
        const pitch = document.getElementsByClassName('pitch')[0];
        playerIcons.forEach(p => pitch.appendChild(p));
    }

    const findTopPerPos = (data) => {

        let rightBacks = new Array();
        let leftBacks = new Array();
        let centreBacks = new Array();
        let goalKeepers = new Array();
        let centralMidfielders = new Array();
        let defensiveMidfielders = new Array();
        let attackingMidfielders = new Array();
        let leftMidfielders = new Array();
        let rightMidfielders = new Array();
        let leftWingers = new Array();
        let rightWingers = new Array();
        let centreForwards = new Array();

        data.forEach(data => {
            if (data.matchesPlayed > 5) {
                switch (data.position) {
                    case "Right-Back":
                        rightBacks.push(data);
                        break;
                    case "Left-Back":
                        leftBacks.push(data);
                        break;
                    case "Centre-Back":
                        centreBacks.push(data);
                        break;
                    case "Goalkeeper":
                        goalKeepers.push(data);
                        break;
                    case "Central Midfield":
                        centralMidfielders.push(data);
                        break;
                    case "Defensive Midfield":
                        defensiveMidfielders.push(data);
                        break;
                    case "Attacking Midfield":
                        attackingMidfielders.push(data);
                        break;
                    case "Left Midfield":
                        leftMidfielders.push(data);
                        break;
                    case "Right Midfield":
                        rightMidfielders.push(data);
                        break;
                    case "Left Winger":
                        leftWingers.push(data);
                        break;
                    case "Right Winger":
                        rightWingers.push(data);
                        break;
                    case "Centre-Forward":
                        centreForwards.push(data);
                        break;
                }
            }

        });

        rightBacks = rightBacks.sort((a, b) => (a.rating > b.rating) ? -1 : 1).slice(0, 1)
        leftBacks = leftBacks.sort((a, b) => (a.rating > b.rating) ? -1 : 1).slice(0, 1)
        centreBacks = centreBacks.sort((a, b) => (a.rating > b.rating) ? -1 : 1).slice(0, 3)
        goalKeepers = goalKeepers.sort((a, b) => (a.rating > b.rating) ? -1 : 1).slice(0, 1)
        centralMidfielders = centralMidfielders.sort((a, b) => (a.rating > b.rating) ? -1 : 1).slice(0, 3)
        defensiveMidfielders = defensiveMidfielders.sort((a, b) => (a.rating > b.rating) ? -1 : 1).slice(0, 3)
        attackingMidfielders = attackingMidfielders.sort((a, b) => (a.rating > b.rating) ? -1 : 1).slice(0, 3)
        leftMidfielders = leftMidfielders.sort((a, b) => (a.rating > b.rating) ? -1 : 1).slice(0, 3)
        rightMidfielders = rightMidfielders.sort((a, b) => (a.rating > b.rating) ? -1 : 1).slice(0, 3)
        leftWingers = leftWingers.sort((a, b) => (a.rating > b.rating) ? -1 : 1).slice(0, 3)
        rightMidfielders = rightMidfielders.sort((a, b) => (a.rating > b.rating) ? -1 : 1).slice(0, 3)
        leftWingers = leftWingers.sort((a, b) => (a.rating > b.rating) ? -1 : 1).slice(0, 3)
        rightWingers = rightWingers.sort((a, b) => (a.rating > b.rating) ? -1 : 1).slice(0, 3)
        centreForwards = centreForwards.sort((a, b) => (a.rating > b.rating) ? -1 : 1).slice(0, 3)

        const allPos = new Array();
        allPos.push({
            position: "Right-Back",
            players: rightBacks
        });
        allPos.push({
            position: "Left-Back",
            players: leftBacks
        });
        allPos.push({
            position: "Centre-Back",
            players: centreBacks
        });
        allPos.push({
            position: "Goalkeeper",
            players: goalKeepers
        });
        allPos.push({
            position: "Central Midfield",
            players: centralMidfielders
        });
        allPos.push({
            position: "Defensive Midfield",
            players: defensiveMidfielders
        });
        allPos.push({
            position: "Attacking Midfield",
            players: attackingMidfielders
        });
        allPos.push({
            position: "Left Midfield",
            players: leftMidfielders
        });
        allPos.push({
            position: "Right Midfield",
            players: rightMidfielders
        });
        allPos.push({
            position: "Left Winger",
            players: leftWingers
        });
        allPos.push({
            position: "Right Winger",
            players: rightWingers
        });
        allPos.push({
            position: "Centre-Forward",
            players: centreForwards
        });
        console.log(allPos);
        return allPos;
    }

    const getMarkerEle = (pos) => {
        const marker = document.createElement('span');
        marker.className = 'playerPosMarker';
        marker.textContent = pos;
        return marker;
    }

    const getPlayerIcon = (topPlayer) => {

        const playerIcon = document.createElement('div');
        playerIcon.className = 'player';
        playerIcon.style.backgroundImage = `url(${topPlayer.photoUrl})`;
        playerIcon.style.marginRight = 'auto';
        playerIcon.style.marginLeft = 'auto';
        const tooltip = document.createElement('span');
        tooltip.className = "playerToolTip";
        tooltip.style.zIndex = "500";

        const playerDetails = document.createElement('table');

        const idRow = document.createElement('tr');
        const nameRow = document.createElement('tr');
        const teamRow = document.createElement('tr');
        const posRow = document.createElement('tr');

        const idHead = document.createElement('th');
        const nameHead = document.createElement('th');
        const teamHead = document.createElement('th');
        const posHead = document.createElement('th');

        idHead.textContent = "Name:"
        nameHead.textContent = "Name:"
        teamHead.textContent = "Team:"
        posHead.textContent = "Position:"

        const idCell = document.createElement('td');
        const nameCell = document.createElement('td');
        const posCell = document.createElement('td');
        const teamCell = document.createElement('td');

        idCell.textContent = `${topPlayer.id}`;
        nameCell.textContent = `${topPlayer.firstName + " " + topPlayer.lastName}`;
        posCell.textContent = `${topPlayer.position}`;
        teamCell.textContent = `${topPlayer.team}`;

        idRow.appendChild(idHead);
        idRow.appendChild(idCell);
        nameRow.appendChild(nameHead);
        nameRow.appendChild(nameCell);
        posRow.appendChild(posHead);
        posRow.appendChild(posCell);
        teamRow.appendChild(teamHead);
        teamRow.appendChild(teamCell);

        idRow.style.display = 'none';

        playerDetails.appendChild(idRow);
        playerDetails.appendChild(nameRow);
        playerDetails.appendChild(posRow);
        playerDetails.appendChild(teamRow);

        tooltip.appendChild(playerDetails);
        playerIcon.onclick = gotoPlayer;
        playerIcon.appendChild(tooltip);


        return playerIcon;
    }

    const gotoPlayer = (e) => {
        const playerId = parseInt(e.target.firstChild.firstChild.firstChild.children[1].textContent);
        window.location.href = `/player?id=${playerId}`;
    }

    return (
        <div className="Best11Tab">
            <h2>Best 11 SPFL Team </h2>
            <small>Hover over players to view information.</small>
            <div className="rowBox">
                <h3 style={{ margin: "0 1rem" }} className="link" onClick={(e) => changeFormation(e)}>433</h3>
                <h3 style={{ margin: "0 1rem" }} className="link" onClick={(e) => changeFormation(e)}>4231</h3>
                <h3 style={{ margin: "0 1rem" }} className="link" onClick={(e) => changeFormation(e)}>442</h3>
            </div>
            <div className="pitch" style={{ backgroundImage: `url(${pitchImage})` }}>
                <img src={pitchImage} alt="A pitch" />
            </div>
            <p>content</p>
            <p>content</p>
        </div>
    );
};
export default FirstTab;
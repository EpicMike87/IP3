import React from "react";
import { useState, useEffect } from "react";
import Api from '../../../Helpers/Api';
import pitchImage from "../../../images/pitch4.jpg";
const FirstTab = () => {

    //!!Store these in JSON file
    const playerStyles = new Object();
    const rightBack = new Object();
    rightBack.left = '29%';
    rightBack.bottom = '16%';
    playerStyles.rightBack = rightBack;
    const leftBack = new Object();
    leftBack.left = '29%';
    leftBack.bottom = '84%';
    playerStyles.leftBack = leftBack;

    const [player, setPlayer] = useState("");
    const [players, setPlayers] = useState([]);
    const [test, setTest] = useState();

    const searchPlayers = () => {
        Api.get(`players/all`)
            .then(res => {
                console.log(res.data);
                const topPlayers = findTopPerPos(res.data);
                setPlayers(res.data);

                const pitch = document.getElementsByClassName('pitch')[0];

                const rightBack = getPlayerIcon(topPlayers[0]);
                rightBack.style.left = playerStyles.rightBack.left;
                rightBack.style.bottom = playerStyles.rightBack.bottom;
                rightBack.appendChild(getMarkerEle('RB'));
                pitch.appendChild(rightBack);

                const leftBack = getPlayerIcon(topPlayers[1]);
                leftBack.style.left = playerStyles.leftBack.left;
                leftBack.style.bottom = playerStyles.leftBack.bottom;
                leftBack.appendChild(getMarkerEle('LB'));
                pitch.appendChild(leftBack);


                const centreBack = getPlayerIcon(topPlayers[2]);
                centreBack.style.left = "22%";
                centreBack.style.bottom = '64%';
                centreBack.appendChild(getMarkerEle('CB'));
                pitch.appendChild(centreBack);


                const centreBack2 = getPlayerIcon(topPlayers[3]);
                centreBack2.style.left = "22%";
                centreBack2.style.bottom = '38%';
                centreBack2.appendChild(getMarkerEle('CB'));
                pitch.appendChild(centreBack2);

                const goalkeeper = getPlayerIcon(topPlayers[4]);
                goalkeeper.style.left = "14%";
                goalkeeper.style.bottom = '52%';
                goalkeeper.appendChild(getMarkerEle('GK'));
                pitch.appendChild(goalkeeper);

                const defMid = getPlayerIcon(topPlayers[7]);
                defMid.style.left = "37.3%";
                defMid.style.bottom = '52%';
                defMid.appendChild(getMarkerEle('DM'));
                pitch.appendChild(defMid);

                const cenMid = getPlayerIcon(topPlayers[5]);
                cenMid.style.left = "50%";
                cenMid.style.bottom = '65%';
                cenMid.appendChild(getMarkerEle('CM'));
                pitch.appendChild(cenMid);

                const cenMid2 = getPlayerIcon(topPlayers[6]);
                cenMid2.style.left = "50%";
                cenMid2.style.bottom = '38%';
                cenMid2.appendChild(getMarkerEle('CM'));
                pitch.appendChild(cenMid2);

                const leftWing = getPlayerIcon(topPlayers[10]);
                leftWing.style.left = "59%";
                leftWing.style.bottom = '80%';
                leftWing.appendChild(getMarkerEle('LW'));
                pitch.appendChild(leftWing);

                const rightWing = getPlayerIcon(topPlayers[11]);
                rightWing.style.left = "59%";
                rightWing.style.bottom = '15%';
                rightWing.appendChild(getMarkerEle('RW'));
                pitch.appendChild(rightWing);

                const cenForward = getPlayerIcon(topPlayers[12]);
                cenForward.style.left = "65%";
                cenForward.style.bottom = '52%';
                cenForward.appendChild(getMarkerEle('CF'));
                pitch.appendChild(cenForward);

            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        let ignore = false;

        if (!ignore) searchPlayers()
        return () => { ignore = true; }
    }, []);

    const getMarkerEle = (pos) => {
        const marker = document.createElement('span');
        marker.className = 'playerPosMarker';
        marker.textContent = pos;
        return marker;
    }

    const findTopPerPos = (data) => {
        let rightBacks = new Array();
        let leftBacks = new Array();
        let centreBacks = new Array();
        let goalKeepers = new Array();
        let centralMidfielders = new Array();
        let defensiveMidfielders = new Array();
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

        const allPos = new Array();
        allPos.push(rightBacks);
        allPos.push(leftBacks);
        allPos.push(centreBacks);
        allPos.push(goalKeepers);
        allPos.push(centralMidfielders);
        allPos.push(defensiveMidfielders);
        allPos.push(leftMidfielders);
        allPos.push(rightMidfielders);
        allPos.push(leftWingers);
        allPos.push(rightWingers);
        allPos.push(centreForwards);
        allPos.forEach(pos => {
            pos.sort((a, b) => (a.rating > b.rating) ? -1 : 1)
        })
        const topPlayers = new Array();
        allPos.forEach(playersPos => {
            topPlayers.push(playersPos[0])
            if (playersPos[0].position == "Centre-Back" || playersPos[0].position == "Central Midfield") {
                topPlayers.push(playersPos[1])
            }
        })
        console.log(allPos);
        return topPlayers;
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
            <div className="pitch" style={{ backgroundImage: `url(${pitchImage})` }}>
                <img src={pitchImage} alt="A pitch" />
            </div>
            <p>content</p>
            <p>content</p>
        </div>
    );
};
export default FirstTab;
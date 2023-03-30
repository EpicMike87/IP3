import React from "react";
import DonutChart from "./DonutChart";

function PlayerCard({player}){



    return (

        <div className="PlayerCard">
            <div className="PlayerHeader">
                <div className="PlayerImgContainer">
                    <img className="PlayerImg" alt="Player Image" src={player.photoUrl}/> 
                </div>
                <div className="PlayerInformation">
                    <span className="PlayerCardNameInformation">
                    <h4 className="PlayerCardName">{`${player.firstName} ${player.lastName}`}</h4>
                    </span>
                    <span className="PlayerCardTeamInformation">
                    <h1 id="PlayerCardInfoH1">Team: </h1>
                    <p className="PlayerCardTeam">{`${player.team}`}</p>
                    </span>
                    <span className="PlayerCardAgeInformation">
                    <h1 id="PlayerCardInfoH1">Age: </h1>
                    <p className="PlayerCardAge">{`${player.age}`}</p>
                    </span>
                    <span className="PlayerCardMatchesInformation">
                    <h1 id="PlayerCardInfoH1">Matches Played: </h1>
                    <p className="PlayerCardMatches">{`${player.matchesPlayed}`}</p>
                    </span>
                    <span className="PlayerCardPositionInformation">
                    <h1 id="PlayerCardInfoH1">Position: </h1>
                    <p className="PlayerCardPosition">{`${player.position}`}</p>
                    </span>
                </div>
            </div>
            <div className="PlayerStatistics">
            <DonutChart player={player}/>
            </div>
        </div>

    );

};

export default PlayerCard;
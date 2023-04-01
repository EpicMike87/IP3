import React from "react";
import DonutChart from "./DonutChart";

function TeamCard({team}){



    return (

        <div className="CardSectionCard">
            <div className="CardSectionHeader">
                <div className="CardSectionImgContainer">
                    <img className="CardSectionImg" alt="Player Image" src={team.photoUrl}/> 
                </div>
                <div className="CardSectionInformation">
                    <span className="CardSectionNameInformation">
                    <h4>{`${team.teamName}`}</h4>
                    </span>
                    <span className="TeamGroundInformation">
                    <h1 id="CardSectionInfoH1">Ground: </h1>
                    <p>{`${team.grounds.name}`}</p>
                    </span>
                    <span className="TeamSeasonInformation">
                    <h1 id="CardSectionInfoH1">Season: </h1>
                    <p>{`${team.allStats.season}`}</p>
                    </span>
                    <span className="CardMatchesInformation">
                    <h1 id="CardSectionInfoH1">Matches Played: </h1>
                    <p>{`${team.allStats.matchesPlayed}`}</p>
                    </span>
                    <span className="TeamPointsInformation">
                    <h1 id="CardSectionInfoH1">Points: </h1>
                    <p>{`${team.points}`}</p>
                    </span>
                </div>
            </div>
            <div className="CardSectionStatistics">
            {/* <DonutChart player={player}/> */}
            </div>
        </div>

    );

};

export default TeamCard;
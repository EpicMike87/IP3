import React from "react";
import DonutChartPlayer from "./DonutCharts/DonutChartPlayer";
import { NavLink } from "react-router-dom";

function PlayerCard({player}){



    return (

        <div className="CardSectionCard">
            <div className="CardSectionHeader">
                <div className="CardSectionImgContainer">
                    <img className="CardSectionImg" alt="Player Image" src={player.photoUrl}/> 
                </div>
                <div className="CardSectionInformation">
                    <span className="CardSectionNameInformation">
                    <h4>{`${player.firstName} ${player.lastName}`}</h4>
                    </span>
                    <span className="PlayerCardTeamInformation">
                    <h1 id="CardSectionInfoH1">Team: </h1>
                    <p className="PlayerCardTeam">{`${player.team}`}</p>
                    </span>
                    <span className="PlayerCardAgeInformation">
                    <h1 id="CardSectionInfoH1">Age: </h1>
                    <p className="PlayerCardAge">{`${player.age}`}</p>
                    </span>
                    <span className="CardMatchesInformation">
                    <h1 id="CardSectionInfoH1">Matches Played: </h1>
                    <p className="PlayerCardMatches">{`${player.matchesPlayed}`}</p>
                    </span>
                    <span className="PlayerCardPositionInformation">
                    <h1 id="CardSectionInfoH1">Position: </h1>
                    <p className="PlayerCardPosition">{`${player.position}`}</p>
                    </span>
                </div>
            </div>
            <div className="CardSectionStatistics">
            <DonutChartPlayer player={player}/>
            </div>
            <button className="learn-more" id='buttonCard'>
            <span class="icon arrow"></span>
                <span className="circle" aria-hidden="true"></span>
                <NavLink to={`/player?id=${player.id}`}>

                <span className="button-text">More About Player</span>
                </NavLink>
            </button>
        </div>

    );

};

export default PlayerCard;
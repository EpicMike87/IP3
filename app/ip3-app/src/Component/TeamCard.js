import React from "react";
import DonutChartTeam from "./DonutCharts/DonutChartTeam";

function TeamCard({team, last5H2H}){
    const lastResults = last5H2H; 



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
            <div className="CardSectionTeamStatistics">
                <h2>Home Stats</h2>
                <div className="HomeStatsCharts">
                    <DonutChartTeam team={team.homeStats}/>
                </div>
                <h2>Away Stats</h2>
                <div className="AwayStatsCharts">
                    <DonutChartTeam team={team.awayStats} />
                </div>
                <h2>Head 2 Heads</h2>
                <div className="H2Hresults">
			        {lastResults.map((result, index) => <div>{result == 'D' ? <div className="resultBox drawBox">D</div> : (result == 'W' ? <div className="resultBox winBox">			  W</div> : <div className="resultBox loseBox">L</div>)}</div>)}
                </div>
            </div>
        </div>

    );

};

export default TeamCard;
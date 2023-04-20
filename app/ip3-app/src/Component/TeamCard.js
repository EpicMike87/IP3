import React from "react";
import DonutChartTeam from "./DonutCharts/DonutChartTeam";
import Link, { Navigate, NavLink } from 'react-router-dom';

function TeamCard({team, last5H2H}){
    const lastResults = last5H2H; 
    // console.log(team)

    const gotoTeam = (teamId) => {
        window.location = `/team?id=${teamId}`;
      }


    return (

        <section className="CardSectionCard">
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
                    <div id="resultsH2H">
			            {lastResults.map((result, index) => <div>{result == 'D' ? <div className="resultBox drawBox">D</div> : (result == 'W' ? <div className="resultBox winBox"> W</div> : <div className="resultBox loseBox">L</div>)}</div>)}
                    </div>
                </div>
                <div className="CardSectionTableRank" style={{color: team.rank == 1 ? "#F5E446" : team.rank == 2 ? "rgb(0, 32, 96)" : team.rank >= 3 && team.rank <= 5 ? "#F0D0B2" : team.rank >= 6 && team.rank <=10 ? "#747474" : team.rank == 11 ? "#FFAD61" : "#F1ADAD"}}>
                    <h2>Current Standing:</h2>
                    <p>{team.rank}</p>
                </div>
            </div>
            <button className="learn-more" id='buttonCard'>
            <span class="icon arrow"></span>
                <span className="circle" aria-hidden="true"></span>
                <NavLink to={`/team?id=${team.id}`}>

                <span className="button-text">More About Team</span>
                </NavLink>
            </button>
        </section>

    );

};

export default TeamCard;
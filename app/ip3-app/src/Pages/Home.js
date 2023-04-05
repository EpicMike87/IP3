import React from "react";
import { useEffect, useState } from 'react';
import Api from '../Helpers/Api';
import playerImage from "../images/homepage2.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../Helpers/sortable.min.js";

function Home() {
  const [dataTable, setDataTable] = useState([]);
  const [playerStats, setPlayerStats] = useState([]);

  const [topGoalScorer, setTopGoalScorer] = useState([]);
  const [mostAssists, setMostAssists] = useState([]);
  const [mostSavesStat, setLeastGoalsConc] = useState([]);
  const [topRatedPlayer, setTopRatedPlayer] = useState([]);
  const [upcomingFixtures, setUpcomingFixtures] = useState([]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };


  useEffect(() => {
    Api.get(`/team/all`)
      .then(res => {
        setDataTable(res.data)
        getFixtures()
      })
      .catch(err => console.log(err))

    //let ignore = false;

    //if (!ignore) 
    searchPlayers()
    //return () => { ignore = true; }

  }, []);

  const getFixtures = () => {
    Api.get('/fixtures/upcoming')
      .then(res => {
        setUpcomingFixtures(res.data.reverse());
        console.log(res.data)
      })
  }

  const searchPlayers = () => {
    Api.get(`players/all`)
      .then(res => {
        //console.log(res.data);

        findTopScorer(res.data)
        findMostAssits(res.data);
        findMostSaves(res.data);
        findTopRatedPlayer(res.data);


      })
      .catch(err => {
        console.log(err);
      });
  }


  const findTopScorer = (data) => {
    let topScorer = new Array();
    data = data.filter(a => a.matchesPlayed > 5);

    data.forEach(data => {
      switch (data.positionType) {
        case "Attacker":
          topScorer.push(data);
          break;
        case "Midfielder":
          topScorer.push(data);
          break;
        case "Defender":
          topScorer.push(data);
          break;
      }
    });

    const allPos = new Array();
    allPos.push(topScorer);
    allPos.forEach(pos => {
      pos.sort((a, b) => (a.goals > b.goals) ? -1 : 1)
    })
    const topPlayerGoals = new Array();
    allPos.forEach(playersPos => {
      topPlayerGoals.push(playersPos[0])
      if (playersPos[0].position == "Centre-Back" || playersPos[0].position == "Central Midfield") {
        topPlayerGoals.push(playersPos[1])
      }
    })
    console.log(topPlayerGoals);

    setTopGoalScorer(topPlayerGoals)
  }

  const findMostAssits = (data) => {
    data = data.filter(a => a.matchesPlayed > 5);
    let mostAssits = new Array();

    data.forEach(data => {
      switch (data.positionType) {
        case "Attacker":
          mostAssits.push(data);
          break;
        case "Midfielder":
          mostAssits.push(data);
          break;
        case "Defender":
          mostAssits.push(data);
          break;
      }
    });

    const allPosAssists = new Array();
    allPosAssists.push(mostAssits);
    allPosAssists.forEach(pos => {
      pos.sort((a, b) => (a.assists > b.assists) ? -1 : 1)
    })
    const topPlayerAssists = new Array();
    allPosAssists.forEach(playersPos => {
      topPlayerAssists.push(playersPos[0])
      // if (playersPos[0].position == "Centre-Back" || playersPos[0].position == "Central Midfield") {
      //  topPlayerAssists.push(playersPos[1])
      // }
    })
    //console.log(topPlayerAssists);

    setMostAssists(topPlayerAssists)
  }


  const findMostSaves = (data) => {
    data = data.filter(a => a.matchesPlayed > 5);
    let MostSaves = new Array();

    data.forEach(data => {
      switch (data.positionType) {
        case "Goalkeeper":
          MostSaves.push(data);
          break;
      }
    });

    const allPosSaves = new Array();
    allPosSaves.push(MostSaves);

    allPosSaves.forEach(pos => {
      pos.sort((a, b) => (a.saves > b.saves) ? -1 : 1)
    })
    const topPlayerSaves = new Array();
    allPosSaves.forEach(playersPos => {
      topPlayerSaves.push(playersPos[0])
      // if (playersPos[0].position == "Centre-Back" || playersPos[0].position == "Central Midfield") {
      //  topPlayerAssists.push(playersPos[1])
      // }
    })
    //console.log(topPlayerSaves);

    setLeastGoalsConc(topPlayerSaves)
  }


  const findTopRatedPlayer = (data) => {
    data = data.filter(a => a.matchesPlayed > 5);
    let HighestRated = new Array();

    data.forEach(data => {
      switch (data.positionType) {
        case "Attacker":
          HighestRated.push(data);
          break;
        case "Midfielder":
          HighestRated.push(data);
          break;
        case "Defender":
          HighestRated.push(data);
          break;
        case "Goalkeeper":
          HighestRated.push(data);
          break;
      }
    });

    const allPosRating = new Array();
    allPosRating.push(HighestRated);
    allPosRating.forEach(pos => {
      pos.sort((a, b) => (a.rating > b.rating) ? -1 : 1)
    })
    const topPlayerRating = new Array();
    allPosRating.forEach(playersPos => {
      topPlayerRating.push(playersPos[0])
    })
    //console.log(topPlayerRating);
    setTopRatedPlayer(topPlayerRating)
  }



  const gotoPlayer = (playerId) => {
    window.location = `/player?id=${playerId}`;
  }

  const gotoTeam = (teamId) => {
    window.location = `/team?id=${teamId}`;
  }

  const gotoTeamByName = (teamName) => {
    window.location = `/team?name=${teamName}`;
  }

  return (

    <div className="Home">

      <div className="backgroundImage">
        <img src={playerImage} alt="teamPageImage" className="teamPageImage"></img>
        <div class="backgroundOverlay"></div>
        <div class="pageHeaderBox"><h1>Best 11</h1></div>
        <br></br>
      </div>

      <br></br>

      <h1>Scottish Premiership 2022-2023</h1>

      <br></br>

      <div className='leagueStats'>
        <table id="homeStats" className="sortable">
          <thead>
            <tr id="teampagerow">
              <th>Position</th>
              <th>Team Name</th>
              <th>Points</th>
              <th>GD</th>
              <th>GA</th>
              <th>GF</th>
              <th>Played</th>
              <th>Won</th>
              <th>Drew</th>
              <th>Lost</th>
            </tr>
          </thead>
          <tbody id="tableBodyHome">
            {dataTable.map((teamData, index) =>
              <tr key={index} onClick={(e) => gotoTeam(`${teamData.id}`)}>
                <td>{teamData.rank}</td>
                <td>{teamData.teamName}</td>
                <td>{teamData.points}</td>
                <td>{teamData.goalDiff}</td>
                <td>{teamData.allStats.goalsAgainst}</td>
                <td>{teamData.allStats.goalsFor}</td>
                <td>{teamData.allStats.matchesPlayed}</td>
                <td>{teamData.allStats.matchesWon}</td>
                <td>{teamData.allStats.matchesDrew}</td>
                <td>{teamData.allStats.matchesLost}</td>

              </tr>
            )}
          </tbody>
        </table>

        <div className='leaguePlayerStats'>

          <div className="teamStats">

            <div className="statsBox">
              <h3>Most Goals</h3>
              {topGoalScorer.map((playersData, index) =>
                <div className="colBox">
                  <div className="rowBox">
                    <img src={playersData.photoUrl} className="searchImage" style={{ cursor: "pointer" }} onClick={(e) => gotoPlayer(playersData.id)}></img>
                    <span className="topPlayerNumber">{playersData.goals}</span>
                  </div>
                  <h3 className="link" style={{ cursor: "pointer" }} onClick={(e) => gotoPlayer(playersData.id)}>{`${playersData.firstName} ${playersData.lastName}`} </h3>
                  <h3 className="link" style={{ cursor: "pointer" }} onClick={(e) => gotoTeam(playersData.teamId)}>{playersData.team} </h3>
                </div>
              )}
            </div>

            <div className="statsBox">
              <h3>Most Assists</h3>
              {mostAssists.map((playersData, index) =>
                <div className="colBox">
                  <div className="rowBox">
                    <img src={playersData.photoUrl} className="searchImage" style={{ cursor: "pointer" }} onClick={(e) => gotoPlayer(playersData.id)}></img>
                    <span className="topPlayerNumber">{playersData.assists}</span>
                  </div>
                  <h3 className="link" style={{ cursor: "pointer" }} onClick={(e) => gotoPlayer(playersData.id)}>{`${playersData.firstName} ${playersData.lastName}`} </h3>
                  <h3 className="link" style={{ cursor: "pointer" }} onClick={(e) => gotoTeam(playersData.teamId)}>{playersData.team} </h3>
                </div>
              )}
            </div>

            <div className="statsBox">
              <h3>Most Saves</h3>
              {mostSavesStat.map((playersData, index) =>
                <div className="colBox">
                  <div className="rowBox">
                    <img src={playersData.photoUrl} className="searchImage" style={{ cursor: "pointer" }} onClick={(e) => gotoPlayer(playersData.id)}></img>
                    <span className="topPlayerNumber">{playersData.saves}</span>
                  </div>
                  <h3 className="link" style={{ cursor: "pointer" }} onClick={(e) => gotoPlayer(playersData.id)}>{`${playersData.firstName} ${playersData.lastName}`} </h3>
                  <h3 className="link" style={{ cursor: "pointer" }} onClick={(e) => gotoTeam(playersData.teamId)}>{playersData.team} </h3>
                </div>
              )}
            </div>

            <div className="statsBox">
              <h3>Highest Rated</h3>
              {topRatedPlayer.map((playersData, index) =>
                <div className="colBox">
                  <div className="rowBox">
                    <img src={playersData.photoUrl} className="searchImage" style={{ cursor: "pointer" }} onClick={(e) => gotoPlayer(playersData.id)}></img>
                    <span className="topPlayerNumber">{parseFloat(playersData.rating).toFixed(2)}</span>
                  </div>
                  <h3 className="link" style={{ cursor: "pointer" }} onClick={(e) => gotoPlayer(playersData.id)}>{`${playersData.firstName} ${playersData.lastName}`} </h3>
                  <h3 className="link" style={{ cursor: "pointer" }} onClick={(e) => gotoTeam(playersData.teamId)}>{playersData.team} </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='leaguePlayerStats' style={{ paddingBottom: "5rem" }}>
        <h2>Upcoming Fixtures</h2>
        <Carousel responsive={responsive} slidesToSlide={3}>
          {upcomingFixtures.map(fixture =>
            <div className="slide" style={{ padding: "0 3rem" }}>

              <div className="rowBox" style={{ justifyContent: "center" }}>
                <small>{new Date(fixture.dateTime).toUTCString()}</small>
              </div>
              <div className="rowBox" style={{ marginBottom: "1rem" }}>
                <div className="colBox" style={{ alignItems: "center" }}>
                  <img src={fixture.homePhotoUrl} style={{ height: "80%", width: "80%", objectFit: "contain", margin: "0 auto", cursor: "pointer" }} onClick={() => {
                    gotoTeamByName(fixture.homeTeamName)
                  }}></img>
                  <h4>{fixture.homeTeamName}</h4>
                </div>
                <div className="colBox" style={{ justifyContent: "center" }}>
                  <h2> V </h2>
                </div>
                <div className="colBox" style={{ alignItems: "center" }}>
                  <img src={fixture.awayPhotoUrl} style={{ height: "80%", width: "80%", objectFit: "contain", margin: "0 auto", cursor: "pointer" }} onClick={() => {
                    gotoTeamByName(fixture.awayTeamName)
                  }}></img>
                  <h4>{fixture.awayTeamName}</h4>
                </div>
              </div>
              <div className="rowBox" style={{ justifyContent: "center", marginBottom: "1rem" }}>
                <h4>Prediction: {fixture.prediction != 'H' ? fixture.homeTeamName : fixture.awayTeamName} Win</h4>
              </div>


            </div>
          )}
        </Carousel>
      </div>
    </div>

  )

}


export default Home;
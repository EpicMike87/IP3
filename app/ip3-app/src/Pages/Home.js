import { useEffect, useState } from 'react';
import Api from '../Helpers/Api';
import playerImage from "../images/homepage2.jpg";


function Home() {
  const [dataTable, setDataTable] = useState([]);
  const [playerStats, setPlayerStats] = useState([]);

  const [topGoalScorer, setTopGoalScorer] = useState();
  const [Goals, setGoals] = useState("");



  useEffect(() => {
    Api.get(`/team/all`)
      .then(res => setDataTable(res.data))
      .catch(err => console.log(err))

    Api.get(`/players/all`)
      .then(res => {
        console.log(res.data);
        //setPlayerStats(res.data);
        //setTopScorer(res.data)
      })
      .catch(err => {
        console.log(err);
      });

  }, []);

  /*
  const setTopScorer = (data) => {
    var maxValueIndex = fun(data);
    console.log(maxValueIndex);
    //playerStats.map((playersData, index) => console.log(playersData[maxValueIndex]))
    setTopGoalScorer(Object.keys(data).forEach(function (key, index) {
      //console.log(data[maxValueIndex])
      //setGoals(data[maxValueIndex].goals)
    }))
  }
  // Returns max value of
  // attribute 'a' in array
  function fun(data) {
    var maxValue = Number.MIN_VALUE;
    for (var i = 0; i < data.length; i++) {
      if (data[i].goals > maxValue) {
        maxValue = data[i].goals;
      }
    }
    return i;
  }
*/


  const gotoTeam = (teamId) => {
    window.location = `/team?id=${teamId}`;
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
        <table id="homeStats">
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
              <h3>Top Goal Scorer</h3>
              <div className="rowBox">
                <table>
                  <tr>
                    <th>Image:</th>
                    {playerStats.map((playersData, index) => <td>{playersData.goals} </td>)}

                    <th>Goals:</th>
                    {playerStats.map((playersData, index) => <td>{playersData.assists} </td>)}

                  </tr>

                  <tr>
                    <th>Name:</th>
                    {playerStats.map((playersData, index) => <td>{playersData.penaltiesScored} </td>)}

                  </tr>
                  <tr>
                    <th>Team:</th>
                    {playerStats.map((playersData, index) => <td>{playersData.shots} </td>)}

                  </tr>
                </table>
              </div>
            </div>

            <div className="statsBox">
              <h3>Most Assists</h3>
              <div className="rowBox">
                <table>
                  <tr>
                    <th>Image:</th>
                    {playerStats.map((playersData, index) => <td>{playersData.goals} </td>)}

                    <th>Assists:</th>
                    {playerStats.map((playersData, index) => <td>{playersData.assists} </td>)}
                  </tr>

                  <tr>
                    <th>Name:</th>
                    {playerStats.map((playersData, index) => <td>{playersData.penaltiesScored} </td>)}

                  </tr>
                  <tr>
                    <th>Team:</th>
                    {playerStats.map((playersData, index) => <td>{playersData.shots} </td>)}

                  </tr>
                </table>
              </div>
            </div>

            <div className="statsBox">
              <h3>Most Clean Sheets</h3>
              <div className="rowBox">
                <table>
                  <tr>
                    <th>Image:</th>
                    {playerStats.map((playersData, index) => <td>{playersData.goals} </td>)}

                    <th>Clean Sheets:</th>
                    {playerStats.map((playersData, index) => <td>{playersData.assists} </td>)}
                  </tr>

                  <tr>
                    <th>Name:</th>
                    {playerStats.map((playersData, index) => <td>{playersData.penaltiesScored} </td>)}

                  </tr>
                  <tr>
                    <th>Team:</th>
                    {playerStats.map((playersData, index) => <td>{playersData.shots} </td>)}

                  </tr>
                </table>
              </div>
            </div>

            <div className="statsBox">
              <h3>Highest Rated</h3>
              <div className="rowBox">
                <table>
                  <tr>
                    <th>Image:</th>
                    {playerStats.map((playersData, index) => <td>{playersData.goals} </td>)}

                    <th>Rating:</th>
                    {playerStats.map((playersData, index) => <td>{playersData.assists} </td>)}
                  </tr>

                  <tr>
                    <th>Name:</th>
                    {playerStats.map((playersData, index) => <td>{playersData.penaltiesScored} </td>)}

                  </tr>
                  <tr>
                    <th>Team:</th>
                    {playerStats.map((playersData, index) => <td>{playersData.shots} </td>)}

                  </tr>
                </table>
              </div>
            </div>

          </div>

        </div>

      </div>

      <br></br>
      <div className='leaguePlayerStats'>
        <h2>Upcoming Fixture Predictions</h2>
      </div>

      <br></br>
      <br></br>
    </div>

  )

}


export default Home;
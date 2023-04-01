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
      .then(res => {
        setDataTable(res.data)
        sortTableNum(0)
      })
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

  function sortTableWord(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("homeStats");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("td")[n];
        y = rows[i + 1].getElementsByTagName("td")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  function sortTableNum(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("homeStats");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
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
              <th onClick={(e) => sortTableNum(0)}>Position</th>
              <th onClick={(e) => sortTableWord(1)}>Team Name</th>
              <th onClick={(e) => sortTableNum(2)}>Points</th>
              <th onClick={(e) => sortTableNum(3)}>GD</th>
              <th onClick={(e) => sortTableNum(4)}>GA</th>
              <th onClick={(e) => sortTableNum(5)}>GF</th>
              <th onClick={(e) => sortTableNum(6)}>Played</th>
              <th onClick={(e) => sortTableNum(7)}>Won</th>
              <th onClick={(e) => sortTableNum(8)}>Drew</th>
              <th onClick={(e) => sortTableNum(9)}>Lost</th>
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
    </div >

  )

}


export default Home;
import { useEffect, useState } from 'react';
import Api from '../Helpers/Api'; 
import Table from "../Component/Table";

function Home() {
    const [dataTable, setDataTable] = useState([]);

    useEffect(() => {
        Api.get(`/teamstats/league_table`)
        .then(res => setDataTable(res.data))
        .catch(err => console.log(err))
    }, []);

    const column = [
        { heading: 'Position', value: 'rank' },
        { heading: 'Team Name', value: 'teamName' },
        { heading: 'Points', value: 'points' },
        { heading: 'Goal Difference', value: 'goalDiff' },
        { heading: 'Goal Against', value: 'allStats.goalsAgainst' },
        { heading: 'Goal For', value: 'allStats.goalsFor' },
        { heading: 'Matches Played', value: 'allStats.matchesPlayed' },
        { heading: 'Matches Won', value: 'allStats.matchesWon' },
        { heading: 'Matches Drew', value: 'allStats.matchesDrew' },
        { heading: 'Matches Lost', value: 'allStats.matchesLost' }
      ]

    return ( 

    <div className = "Home" >
       
        <h1>League Table</h1>
      <Table data={dataTable} column={column} />
      
    </div>
    
    

    )
    
    
    }
  

export default Home;
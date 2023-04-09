import {React} from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
  } from 'chart.js'; 

  import {Doughnut} from 'react-chartjs-2';

  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
  );

  function DonutChartTeam({team}){

    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
  
  
          labels: {
            boxWidth: 10,
            textAlign: "left",
          }, 
        },
      },
      animations: {
        animateRotate: true, 
      },
    };
  
    const options2 = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
  
  
          labels: {
            boxWidth: 10,
            textAlign: "left",
            paddiing: 10,
          }, 
        },
      },
      animations: {
        animateRotate: true, 
      },
    };
  
    const options3 = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
  
  
          labels: {
            boxWidth: 10,
            textAlign: "left",
            paddiing: 10,
          }, 
        },
      },
      animations: {
        animateRotate: true, 
      },
    };

    const data1 = {
      labels: ['Goals Against', 'Goals For'],
      datasets: [{
        data: [team.goalsAgainst, team.goalsFor],
        backgroundColor: ['black', 'red'],
        borderColor: ['black', 'red'],
      }],
    }

    const data2 = {
      labels: ['Won', 'Lost', 'Draw'],
      datasets: [{
        data: [team.matchesWon, team.matchesLost, team.matchesDraw],
        backgroundColor: ['orange', '#00D100', 'purple'],
        borderColor: ['orange', '#00D100', 'purple'],
      }],
    }

    const data3 = {
      labels: ['Played', 'Points Acheived', 'Goal Difference'],
      datasets: [{
        data: [team.matchesPlayed, team.points, team.goalDifference],
        backgroundColor: ['blue', '#43A6C6', 'red'],
        borderColor: ['blue', '#43A6C6' , 'red'],
      }],
    }

    return (

    <>
        <div className={data1.datasets[0].data[0] === 0 && data1.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'DoughnutOne'}>
        <Doughnut data={data1} options={options} />
        </div>
        <div className={data2.datasets[0].data[0] === 0 && data2.datasets[0].data[1] === 0 && data2.datasets[0].data[2] === 0 ? 'DoughnutHide' : 'DoughnutTwo'}>
          <Doughnut data={data2} options={options2} />
        </div>
        <div className={data3.datasets[0].data[0] === 0 && data3.datasets[0].data[1]  === 0 && data3.datasets[0].data[2] === 0 ? 'DoughnutHide' : 'DoughnutThree'}>
          <Doughnut data={data3} options={options3} />
        </div>
    </>
    );

  };

  export default DonutChartTeam; 
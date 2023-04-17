import {React} from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'; 

import { Pie } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function PieChart({player}){

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

    if(player.positionType == "Attacker" && player.matchesPlayed > 0){

        const duelsLost = player.duels - player.duelsWon; 

        const data1 = {
            labels: ['Duels Lost', 'Duels Won'],
            datasets: [{
            data: [duelsLost, player.duelsWon],
            backgroundColor: ['black', 'red'],
            borderColor: ['white', 'white'],
            }],
        }

        const pkMissed = player.penaltiesTaken - player.penaltiesScored; 


        const data2 = {
            labels: ['PK (Scored)', 'PK (Missed)'],
            datasets: [{
            data: [player.penaltiesScored, pkMissed],
            backgroundColor: ['orange', '#00D100'],
            borderColor: ['white', 'white'],
            }],
        }

        const passesCompleted = player.passes * player.passAccuracy / 100;
        const passesIncompleted = player.passes - passesCompleted; 
        const data3 = {
          labels: ['Passes Completed', 'Passes Incomplete'],
          datasets: [{
            data: [passesCompleted.toFixed(0), passesIncompleted.toFixed(0)],
            backgroundColor: ['orange', '#43A6C6'],
            borderColor: ['white', 'white'],
          }],
        }

        const data4 = {
            labels: ['Shots', 'Goals'],
            datasets: [{
              data: [player.shots, player.goals],
              backgroundColor: ['blue', 'orange'],
              borderColor: ['white', 'white'],
            }]
        }

        return (
            <>
                <div className='Pies'>
                    <div className={data1.datasets[0].data[0] === 0 && data1.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'Pie1'}>
                        <Pie data={data1} options={options} />
                    </div>
                    <div className={data2.datasets[0].data[0] === 0 && data2.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'Pie2'}>
                        <Pie data={data2} options={options} />
                    </div>
                    <div className={data3.datasets[0].data[0] === 0 && data3.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'Pie3'}>
                        <Pie data={data3} options={options} />
                    </div>
                    <div className={data4.datasets[0].data[0] === 0 && data4.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'Pie4'}>
                        <Pie data={data4} options={options} />
                    </div>
                </div>
            </>
        )
    } else if (player.positionType === "Midfielder" && player.matchesPlayed > 0){
        if(!player.duels){
            player.duels = 0;
            player.duelsWon = 0;
        }
      
        const duelsLost = player.duels - player.duelsWon; 
      
        const data1 = {
            labels: ['Duels Lost', 'Duels Won'],
            datasets: [{
              data: [duelsLost, player.duelsWon],
              backgroundColor: ['black', 'red'],
              borderColor: ['white', 'white'],
            }],
        }
      
        const passesCompleted = player.passes * player.passAccuracy / 100;
        const passesIncompleted = player.passes - passesCompleted; 
        const data2 = {
            labels: ['Passes Completed', 'Passes Incomplete'],
            datasets: [{
              data: [passesCompleted.toFixed(0), passesIncompleted.toFixed(0)],
              backgroundColor: ['orange', '#00D100'],
              borderColor: ['white', 'white' ],
            }],
        }
      
        const data3 = {
            labels: ['Tackles Won', 'Fouls'],
            datasets: [{
              data: [player.tackles, player.foulsCommitted],
              backgroundColor: ['blue', '#43A6C6'],
              borderColor: ['white', 'white'],
            }]
        }

        const data4 = {
            labels: ['Dribbles (Att)', 'Dribbles (Succ)'],
            datasets: [{
              data: [player.dribblesAttempted, player.successfulDribbles],
              backgroundColor: ['blue', 'orange'],
              borderColor: ['white', 'white'],
            }]
        }

        return (
            <>
                <div className='Pies'>
                    <div className={data1.datasets[0].data[0] === 0 && data1.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'Pie1'}>
                        <Pie data={data1} options={options} />
                    </div>
                    <div className={data2.datasets[0].data[0] === 0 && data2.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'Pie2'}>
                        <Pie data={data2} options={options} />
                    </div>
                    <div className={data3.datasets[0].data[0] === 0 && data3.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'Pie3'}>
                        <Pie data={data3} options={options} />
                    </div>
                    <div className={data4.datasets[0].data[0] === 0 && data4.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'Pie4'}>
                        <Pie data={data4} options={options} />
                    </div>
                </div>
            </>
        )

    } else if ((player.positionType == "Defender") && (player.matchesPlayed > 0) && (player.position !== "Left-Back") && (player.position !== ("Right-Back"))){
        if(!player.duels){
            player.duels = 0;
            player.duelsWon = 0;
        }
      
      
        const duelsLost = player.duels - player.duelsWon; 
      
        const data1 = {
            labels: ['Duels Lost', 'Duels Won'],
            datasets: [{
              data: [duelsLost, player.duelsWon],
              backgroundColor: ['black', 'red'],
              borderColor: ['white', 'white'],
            }],
        }
      
        const data2 = {
            labels: ['Blocks', 'Interceptions'],
            datasets: [{
              data: [player.blocks, player.interceptions],
              backgroundColor: ['orange', '#00D100'],
              borderColor: ['white', 'white'],
            }]
        }
      
      
        const data3 = {
            labels: ['Tackles Won', 'Fouls', 'Cards', 'Cards'],
            datasets: [{
              data: [player.tackles, player.foulsCommitted, player.redCards, player.yellowCards],
              backgroundColor: ['blue', '#43A6C6', 'red', 'yellow'],
              borderColor: ['white', 'white', 'white', 'white'],
            }]
        }

        const passesCompleted = player.passes * player.passAccuracy / 100;
        const passesIncompleted = player.passes - passesCompleted; 
        const data4 = {
            labels: ['Passes Completed', 'Passes Incomplete'],
            datasets: [{
              data: [passesCompleted.toFixed(0), passesIncompleted.toFixed(0)],
              backgroundColor: ['blue', 'orange'],
              borderColor: ['white', 'white' ],
            }],
        }

        return (
            <>
                <div className='Pies'>
                    <div className={data1.datasets[0].data[0] === 0 && data1.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'Pie1'}>
                        <Pie data={data1} options={options} />
                    </div>
                    <div className={data2.datasets[0].data[0] === 0 && data2.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'Pie2'}>
                        <Pie data={data2} options={options} />
                    </div>
                    <div className={data3.datasets[0].data[0] === 0 && data3.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'Pie3'}>
                        <Pie data={data3} options={options} />
                    </div>
                    <div className={data4.datasets[0].data[0] === 0 && data4.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'Pie4'}>
                        <Pie data={data4} options={options} />
                    </div>
                </div>
            </>
        )
    } else if((player.position == "Left-Back") || (player.position == "Right-Back")){

        if(!player.duels){
          player.duels = 0;
          player.duelsWon = 0;
        }
    
        const duelsLost = player.duels - player.duelsWon; 
    
        const data1 = {
          labels: ['Duels Lost', 'Duels Won'],
          datasets: [{
            data: [duelsLost, player.duelsWon],
            backgroundColor: ['black', 'red'],
            borderColor: ['white', 'white'],
          }],
        }

        const passesCompleted = player.passes * player.passAccuracy / 100;
        const passesIncompleted = player.passes - passesCompleted; 
        const data2 = {
            labels: ['Passes Completed', 'Passes Incomplete'],
            datasets: [{
              data: [passesCompleted.toFixed(0), passesIncompleted.toFixed(0)],
              backgroundColor: ['orange', '#00D100'],
              borderColor: ['white', 'white' ],
            }],
        }
    
    
        const data3 = {
          labels: ['Tackles Won', 'Fouls', 'Cards', 'Cards'],
          datasets: [{
            data: [player.tackles, player.foulsCommitted, player.redCards, player.yellowCards],
            backgroundColor: ['blue', '#43A6C6', 'red', 'yellow'],
            borderColor: ['white', 'white', 'white', 'white'],
          }]
        }

        const data4 = {
            labels: ['Dribbles (Att)', 'Dribbles (Succ)'],
            datasets: [{
              data: [player.dribblesAttempted, player.successfulDribbles],
              backgroundColor: ['blue', 'orange'],
              borderColor: ['white', 'white'],
            }]
        }
    
        return (
            <>
                <div className='Pies'>
                    <div className={data1.datasets[0].data[0] === 0 && data1.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'Pie1'}>
                        <Pie data={data1} options={options} />
                    </div>
                    <div className={data2.datasets[0].data[0] === 0 && data2.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'Pie2'}>
                        <Pie data={data2} options={options} />
                    </div>
                    <div className={data3.datasets[0].data[0] === 0 && data3.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'Pie3'}>
                        <Pie data={data3} options={options} />
                    </div>
                    <div className={data4.datasets[0].data[0] === 0 && data4.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'Pie4'}>
                        <Pie data={data4} options={options} />
                    </div>
                </div>
            </>
        )
          
    } else if (player.position == "Goalkeeper" && player.matchesPlayed > 0){

        const data1 = {
          labels: ['Passes', 'Pass Accuracy'],
          datasets: [{
            data: [player.passes, player.passAccuracy],
            backgroundColor: ['black', 'red'],
            borderColor: ['white', 'white'],
          }],
        }
    
        const data2 = {
          labels: ['Total Fouls', 'Cards', 'Cards'],
          datasets: [{
            data: [player.foulsCommitted, player.redCards, player.yellowCards],
            backgroundColor: ['black', 'red', 'yellow'],
            borderColor: ['white', 'white', 'white'],
          }]
        }
    
        const data3 = {
          labels: ['Conceded', 'Saves'],
          datasets: [{
            data: [player.goalsConceded, player.saves],
            backgroundColor: ['blue', '#43A6C6'],
            borderColor: ['white', 'white'],
          }]
        }
    
        return(
            <>
                <div className='Pies'>
                    <div className={data1.datasets[0].data[0] === 0 && data1.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'Pie1'}>
                        <Pie data={data1} options={options} />
                    </div>
                    <div className={data2.datasets[0].data[0] === 0 && data2.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'Pie2'}>
                        <Pie data={data2} options={options} />
                    </div>
                    <div className={data3.datasets[0].data[0] === 0 && data3.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'Pie3'}>
                        <Pie data={data3} options={options} />
                    </div>
                </div>
            </>
        )
    }

    return( 
        <>
            <h2>No Statistics for this Player</h2>
        </>
    )
}

export default PieChart;
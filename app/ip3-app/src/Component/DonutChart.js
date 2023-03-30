import {React, useEffect, useState} from 'react';
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

function DonutChart({player}) {
 

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


  const options4 = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    animations: {
      animateRotate: true, 
    },
  };

  // const textCenter = {
  //   id: 'textCenter',
  //   beforeDatasetsDraw(chart, args, pluginOptions) {
  //     const { ctx, data} = chart;

  //     ctx.save();
  //     ctx.font = 'bolder 10px sans-serif';
  //     ctx.fillStyle = 'red';
  //     ctx.textAlign = 'center';
  //     ctx.textBaseline = 'middle';
  //     ctx.fillText(`Rating: ${data.datasets[0].data[0]}`, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
  //   },
  // };

  if((player.position == "Left-Back") || (player.position == "Right-Back")){

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
        borderColor: ['black', 'red'],
      }],
    }

    const data2 = {
      labels: ['Blocks', 'Interceptions'],
      datasets: [{
        data: [player.blocks, player.interceptions],
        backgroundColor: ['orange', '#00D100'],
        borderColor: ['orange', '#00D100'],
      }]
    }


    const data3 = {
      labels: ['Tackles Won', 'Fouls', 'Cards', 'Cards'],
      datasets: [{
        data: [player.tackles, player.foulsCommitted, player.redCards, player.yellowCards],
        backgroundColor: ['blue', '#43A6C6', 'red', 'yellow'],
        borderColor: ['blue', '#43A6C6', 'red', 'yellow'],
      }]
    }

    // const data4 = {
    //   labels: ['Overall Performance'],
    //   datasets: [{
    //     data: [player.rating],
    //     backgroundColor: [player.rating < 7.0 ? "orange" : player.rating < 8.0 ? "#FFD700" : "#00D100"],
    //     borderColor: [player.rating < 7.0 ? "orange" : player.rating < 8.0 ? "#FFD700" : "#00D100"],
    //   }]
    // }

    return(
      <>
        <div className='Doughnuts'>
          <div className={data1.datasets[0].data[0] === 0 && data1.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'Doughnut1'}>
          <Doughnut data={data1} options={options} />
          </div>
          <div className={data2.datasets[0].data[0] === 0 && data2.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'Doughnut2'}>
          <Doughnut data={data2} options={options2} />
          </div>
          <div className={data3.datasets[0].data[0] === 0 && data3.datasets[0].data[1]  === 0 && data3.datasets[0].data[2] === 0 && data3.datasets[0].data[3] === 0? 'DoughnutHide' : 'Doughnut3'}>
          <Doughnut data={data3} options={options3} />
          </div>
        </div>
        {/* <div className='DoughnutRating'>
          <Doughnut data={data4} options={options4} plugins={[textCenter]} />
        </div> */}
        <div className='Rating' style={{color: player.rating < 6.5 ? "orange" : player.rating < 7.0 ? "#FFD700" : "#00D100"}}>
          <p>Rating: {player.rating.toFixed(2)}</p>
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
        borderColor: ['black', 'red'],
      }],
    }

    const data2 = {
      labels: ['Blocks', 'Interceptions'],
      datasets: [{
        data: [player.blocks, player.interceptions],
        backgroundColor: ['orange', '#00D100'],
        borderColor: ['orange', '#00D100'],
      }]
    }


    const data3 = {
      labels: ['Tackles Won', 'Fouls', 'Cards', 'Cards'],
      datasets: [{
        data: [player.tackles, player.foulsCommitted, player.redCards, player.yellowCards],
        backgroundColor: ['blue', '#43A6C6', 'red', 'yellow'],
        borderColor: ['blue', '#43A6C6', 'red', 'yellow'],
      }]
    }

    // const data4 = {
    //   labels: ['Overall Performance'],
    //   datasets: [{
    //     data: [player.rating],
    //     backgroundColor: [player.rating < 7.0 ? "orange" : player.rating < 8.0 ? "#FFD700" : "#00D100"],
    //     borderColor: [player.rating < 7.0 ? "orange" : player.rating < 8.0 ? "#FFD700" : "#00D100"],
    //   }]
    // }

    return(
      <>
        <div className='Doughnuts'>
          <div className={data1.datasets[0].data[0] === 0 && data1.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'Doughnut1'}>
          <Doughnut data={data1} options={options} />
          </div>
          <div className={data2.datasets[0].data[0] === 0 && data2.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'Doughnut2'}>
          <Doughnut data={data2} options={options2} />
          </div>
          <div className={data3.datasets[0].data[0] === 0 && data3.datasets[0].data[1]  === 0 && data3.datasets[0].data[2] === 0 && data3.datasets[0].data[3] === 0 ? 'DoughnutHide' : 'Doughnut3'}>
          <Doughnut data={data3} options={options3} />
          </div>
        </div>
        {/* <div className='DoughnutRating'>
          <Doughnut data={data4} options={options4} plugins={[textCenter]} />
        </div> */}
        <div className='Rating' style={{color: player.rating < 6.5 ? "orange" : player.rating < 7.0 ? "#FFD700" : "#00D100"}}>
          <p>Rating: {player.rating.toFixed(2)}</p>
        </div>
      </>
    )
  } else if (player.positionType == "Midfielder" && player.matchesPlayed > 0){

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
        borderColor: ['black', 'red'],
      }],
    }

    const passesCompleted = player.passes * player.passAccuracy / 100;
    const passesIncompleted = player.passes - passesCompleted; 
    const data2 = {
      labels: ['Passes Completed', 'Passes Incomplete', 'Assists'],
      datasets: [{
        data: [passesCompleted.toFixed(0), passesIncompleted.toFixed(0), player.assists],
        backgroundColor: ['orange', '#00D100', 'purple'],
        borderColor: ['orange', '#00D100', 'purple'],
      }],
    }

    // const data3 = {
    //   labels: ['Blocks', 'Interceptions'],
    //   datasets: [{
    //     data: [player.blocks, player.interceptions],
    //     backgroundColor: ['blue', '#43A6C6'],
    //     borderColor: ['blue', '#43A6C6'],
    //   }]
    // }

    const data3 = {
      labels: ['Tackles Won', 'Fouls'],
      datasets: [{
        data: [player.tackles, player.foulsCommitted],
        backgroundColor: ['blue', '#43A6C6'],
        borderColor: ['blue', '#43A6C6'],
      }]
    }

    // const data4 = {
    //   labels: ['Overall Performance'],
    //   datasets: [{
    //     data: [player.rating],
    //     backgroundColor: [player.rating < 7.0 ? "orange" : player.rating < 8.0 ? "#FFD700" : "#00D100"],
    //     borderColor: [player.rating < 7.0 ? "orange" : player.rating < 8.0 ? "#FFD700" : "#00D100"],
    //   }]
    // }

    return(
      <>
        <div className='Doughnuts'>
          <div className={data1.datasets[0].data[0] === 0 && data1.datasets[0].data[1] === 0 ? 'DoughnutHide' : 'Doughnut1'}>
          <Doughnut data={data1} options={options} />
          </div>
          <div className={data2.datasets[0].data[0] === 0 && data2.datasets[0].data[1] === 0 && data2.datasets[0].data[2] === 0 ? 'DoughnutHide' : 'Doughnut2'}>
          <Doughnut data={data2} options={options2} />
          </div>
          <div className={data3.datasets[0].data[0] === 0 && data3.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'Doughnut3'}>
          <Doughnut data={data3} options={options3} />
          </div>
        </div>
        {/* <div className='DoughnutRating'>
          <Doughnut data={data4} options={options4} plugins={[textCenter]} />
        </div> */}
        <div className='Rating' style={{color: player.rating < 6.5 ? "orange" : player.rating < 7.0 ? "#FFD700" : "#00D100"}}>
        <p>Rating: {player.rating.toFixed(2)}</p>
        </div>
      </>
    )
  } else if (player.positionType == "Attacker" && player.matchesPlayed > 0){

    if(!player.penaltiesTaken){
      player.penaltiesTaken = 0;
      player.penaltiesScored = 0;
    }

    const penaltiesMissed = player.penaltiesTaken - player.penaltiesScored; 

    const data1 = {
      labels: [ 'Penalties Scored', 'Penalties Missed'],
      datasets: [{
        data: [player.penaltiesScored, penaltiesMissed],
        backgroundColor: ['black', 'red'],
        borderColor: ['black', 'red'],
      }]
    }

    const passesCompleted = player.passes * player.passAccuracy / 100;
    const passesIncompleted = player.passes - passesCompleted; 
    const data2 = {
      labels: ['Passes Completed', 'Passes Incomplete', 'Assists'],
      datasets: [{
        data: [passesCompleted.toFixed(0), passesIncompleted.toFixed(0), player.assists],
        backgroundColor: ['orange', '#00D100', 'purple'],
        borderColor: ['orange', '#00D100', 'purple'],
      }],
    }

    const data3 = {
      labels: ['Shots', 'On Target', 'Goals'],
      datasets: [{
        data: [player.shots, player.shotsOnTarget, player.goals],
        backgroundColor: ['blue', '#43A6C6', '#00D100'],
        borderColor: ['blue', '#43A6C6' , '#00D100'],
      }]
    }

    // const data4 = {
    //   labels: ['Overall Performance'],
    //   datasets: [{
    //     data: [player.rating],
    //     backgroundColor: [player.rating < 7.0 ? "orange" : player.rating < 8.0 ? "#FFD700" : "#00D100"],
    //     borderColor: [player.rating < 7.0 ? "orange" : player.rating < 8.0 ? "#FFD700" : "#00D100"],
    //   }]
    // }

    return(
      <>
        <div className='Doughnuts'>
          <div className={data1.datasets[0].data[0] === 0 && data1.datasets[0].data[1] === 0 ? 'DoughnutHide' : 'Doughnut1'}>
          <Doughnut data={data1} options={options} />
          </div>
          <div className={data2.datasets[0].data[0] === 0 && data2.datasets[0].data[1] === 0 && data2.datasets[0].data[2] === 0 ? 'DoughnutHide' : 'Doughnut2'}>
          <Doughnut data={data2} options={options2} />
          </div>
          <div className={data3.datasets[0].data[0] === 0 && data3.datasets[0].data[1]  === 0 && data3.datasets[0].data[2] === 0 ? 'DoughnutHide' : 'Doughnut3'}>
          <Doughnut data={data3} options={options3} />
          </div>
        </div>
        {/* <div className='DoughnutRating'>
          <Doughnut data={data4} options={options4} plugins={[textCenter]} />
        </div> */}
        <div className='Rating' style={{color: player.rating < 6.5 ? "orange" : player.rating < 7.0 ? "#FFD700" : "#00D100"}}>
        <p>Rating: {player.rating.toFixed(2)}</p>
        </div>
      </>
    )
  } else if (player.position == "Goalkeeper" && player.matchesPlayed > 0){

    const data1 = {
      labels: ['Passes', 'Pass Accuracy'],
      datasets: [{
        data: [player.passes, player.passAccuracy],
        backgroundColor: ['black', 'red'],
        borderColor: ['black', 'red'],
      }],
    }

    const data2 = {
      labels: ['Total Fouls', 'Cards', 'Cards'],
      datasets: [{
        data: [player.foulsCommitted, player.redCards, player.yellowCards],
        backgroundColor: ['black', 'red', 'yellow'],
        borderColor: ['black', 'red', 'yellow'],
      }]
    }

    const data3 = {
      labels: ['Conceded', 'Saves'],
      datasets: [{
        data: [player.goalsConceded, player.saves],
        backgroundColor: ['blue', '#43A6C6'],
        borderColor: ['blue', '#43A6C6'],
      }]
    }

    // const data4 = {
    //   labels: ['Overall Performance'],
    //   datasets: [{
    //     data: [player.rating],
    //     backgroundColor: [player.rating < 7.0 ? "orange" : player.rating < 8.0 ? "#FFD700" : "#00D100"],
    //     borderColor: [player.rating < 7.0 ? "orange" : player.rating < 8.0 ? "#FFD700" : "#00D100"],
    //   }]
    // }

    return(
      <>
        <div className='Doughnuts'>
          <div className={data1.datasets[0].data[0] === 0 && data1.datasets[0].data[1] === 0 ? 'DoughnutHide' : 'Doughnut1'}>
          <Doughnut data={data1} options={options} />
          </div>
          <div className={data2.datasets[0].data[0] === 0 && data2.datasets[0].data[1] === 0 && data2.datasets[0].data[2] === 0 ? 'DoughnutHide' : 'Doughnut2'}>
          <Doughnut data={data2} options={options2} />
          </div>
          <div className={data3.datasets[0].data[0] === 0 && data3.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'Doughnut3'}>
          <Doughnut data={data3} options={options3} />
          </div>
        </div>
        {/* <div className='DoughnutRating'>
          <Doughnut data={data4} options={options4} plugins={[textCenter]} />
        </div> */}
        <div className='Rating' style={{color: player.rating < 6.5 ? "orange" : player.rating < 7.0 ? "#FFD700" : "#00D100"}}>
        <p>Rating: {player.rating.toFixed(2)}</p>
        </div>
      </>
    )
  }


 return(
  <>
  <div style={{textAlign: 'center', marginTop: 'auto', marginBottom: 'auto', marginRight: '25px', marginLeft: '25px', display: 'flex', flexWrap: 'wrap'}} >
  No statistics are available for this Player.
  </div>
  </>
 );

}

  export default DonutChart;
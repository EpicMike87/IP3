import {React, useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
  } from 'chart.js'; 

  import {Doughnut} from 'react-chartjs-2';
  import AnimatedNumber from 'animated-number-react'; 

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

  const textCenter = {
    id: 'textCenter',
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, data} = chart;

      ctx.save();
      ctx.font = 'bolder 10px sans-serif';
      ctx.fillStyle = 'red';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`Rating: ${data.datasets[0].data[0]}`, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
    },
  };


  if (player.position == "Defender" && player.matchesPlayed > 0){

    const data1 = {
      labels: ['Duels', 'Duels Won'],
      datasets: [{
        data: [player.duels, player.duelsWon],
        backgroundColor: ['black', 'red'],
        borderColor: ['black', 'red'],
      }],
    }

    const data2 = {
      labels: ['Tackles', 'Total Fouls', 'Cards', 'Cards'],
      datasets: [{
        data: [player.tackles, player.foulsCommitted, player.redCards, player.yellowCards],
        backgroundColor: ['orange', 'black', 'red', 'yellow'],
        borderColor: ['orange', 'black', 'red', 'yellow'],
      }]
    }

    const data3 = {
      labels: ['Blocks', 'Interceptions', 'Passes'],
      datasets: [{
        data: [player.blocks, player.interceptions, player.passes],
        backgroundColor: ['blue', '#43A6C6', 'purple'],
        borderColor: ['blue', '#43A6C6', 'purple'],
      }]
    }

    const data4 = {
      labels: ['Overall Performance'],
      datasets: [{
        data: [player.rating],
        backgroundColor: [player.rating < 7.0 ? "orange" : player.rating < 8.0 ? "#FFD700" : "#00D100"],
        borderColor: [player.rating < 7.0 ? "orange" : player.rating < 8.0 ? "#FFD700" : "#00D100"],
      }]
    }

    return(
      <>
        <div className='Doughnuts'>
          <div className={data1.datasets[0].data[0] === 0 && data1.datasets[0].data[1]  === 0 ? 'DoughnutHide' : 'Doughnut1'}>
          <Doughnut data={data1} options={options} />
          </div>
          <div className={data2.datasets[0].data[0] === 0 && data2.datasets[0].data[1]  === 0 && data2.datasets[0].data[2] === 0 && data2.datasets[0].data[3] === 0  ? 'DoughnutHide' : 'Doughnut2'}>
          <Doughnut data={data2} options={options2} />
          </div>
          <div className={data3.datasets[0].data[0] === 0 && data3.datasets[0].data[1]  === 0 && data3.datasets[0].data[2] === 0 ? 'DoughnutHide' : 'Doughnut3'}>
          <Doughnut data={data3} options={options3} />
          </div>
        </div>
        {/* <div className='DoughnutRating'>
          <Doughnut data={data4} options={options4} plugins={[textCenter]} />
        </div> */}
        <div className='Rating' style={{color: player.rating < 7.0 ? "orange" : player.rating < 8.0 ? "#FFD700" : "#00D100"}}>
          <AnimatedNumber value={player.rating} className='animNumber' duration={1000}/>
        </div>
      </>
    )
  } else if (player.position == "Midfielder" && player.matchesPlayed > 0){

    if(!player.duels && !player.duelsWon){
      player.duels = 0;
      player.duelsWon = 0;
    }

    const data1 = {
      labels: ['Duels', 'Duels Won'],
      datasets: [{
        data: [player.duels, player.duelsWon],
        backgroundColor: ['black', 'red'],
        borderColor: ['black', 'red'],
      }],
    }

    const data2 = {
      labels: [ 'Passes', 'Pass Accuracy', 'Assists'],
      datasets: [{
        data: [player.passes, player.passAccuracy, player.assists],
        backgroundColor: ['orange', 'black', 'red'],
        borderColor: ['orange', 'black', 'red'],
      }]
    }

    const data3 = {
      labels: ['Blocks', 'Interceptions'],
      datasets: [{
        data: [player.blocks, player.interceptions],
        backgroundColor: ['blue', '#43A6C6'],
        borderColor: ['blue', '#43A6C6'],
      }]
    }

    const data4 = {
      labels: ['Overall Performance'],
      datasets: [{
        data: [player.rating],
        backgroundColor: [player.rating < 7.0 ? "orange" : player.rating < 8.0 ? "#FFD700" : "#00D100"],
        borderColor: [player.rating < 7.0 ? "orange" : player.rating < 8.0 ? "#FFD700" : "#00D100"],
      }]
    }

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
        <div className='Rating' style={{color: player.rating < 7.0 ? "orange" : player.rating < 8.0 ? "#FFD700" : "#00D100"}}>
        <AnimatedNumber value={player.rating}/>
        </div>
      </>
    )
  } else if (player.position == "Attacker" && player.matchesPlayed > 0){

    const data1 = {
      labels: ['Passes', 'Pass Accuracy', 'Assists'],
      datasets: [{
        data: [player.passes, player.passAccuracy, player.assists],
        backgroundColor: ['black', 'red', 'purple'],
        borderColor: ['black', 'red', 'purple'],
      }],
    }

    const data2 = {
      labels: [ 'Penalties Taken', 'Penalties Scored'],
      datasets: [{
        data: [player.penaltiesTaken, player.penaltiesScored],
        backgroundColor: ['orange', 'black'],
        borderColor: ['orange', 'black'],
      }]
    }

    const data3 = {
      labels: ['Shots', 'On Target', 'Goals'],
      datasets: [{
        data: [player.shots, player.shotsOnTarget, player.goals],
        backgroundColor: ['blue', '#43A6C6', '#00D100'],
        borderColor: ['blue', '#43A6C6' , '#00D100'],
      }]
    }

    const data4 = {
      labels: ['Overall Performance'],
      datasets: [{
        data: [player.rating],
        backgroundColor: [player.rating < 7.0 ? "orange" : player.rating < 8.0 ? "#FFD700" : "#00D100"],
        borderColor: [player.rating < 7.0 ? "orange" : player.rating < 8.0 ? "#FFD700" : "#00D100"],
      }]
    }

    return(
      <>
        <div className='Doughnuts'>
          <div className={data1.datasets[0].data[0] === 0 && data1.datasets[0].data[1] === 0  && data1.datasets[0].data[2] === 0 ? 'DoughnutHide' : 'Doughnut1'}>
          <Doughnut data={data1} options={options} />
          </div>
          <div className={data2.datasets[0].data[0] === 0 && data2.datasets[0].data[1] === 0 ? 'DoughnutHide' : 'Doughnut2'}>
          <Doughnut data={data2} options={options2} />
          </div>
          <div className={data3.datasets[0].data[0] === 0 && data3.datasets[0].data[1]  === 0 && data3.datasets[0].data[2] === 0 ? 'DoughnutHide' : 'Doughnut3'}>
          <Doughnut data={data3} options={options3} />
          </div>
        </div>
        {/* <div className='DoughnutRating'>
          <Doughnut data={data4} options={options4} plugins={[textCenter]} />
        </div> */}
        <div className='Rating' style={{color: player.rating < 7.0 ? "orange" : player.rating < 8.0 ? "#FFD700" : "#00D100"}}>
        <AnimatedNumber value={player.rating}/>
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

    const data4 = {
      labels: ['Overall Performance'],
      datasets: [{
        data: [player.rating],
        backgroundColor: [player.rating < 7.0 ? "orange" : player.rating < 8.0 ? "#FFD700" : "#00D100"],
        borderColor: [player.rating < 7.0 ? "orange" : player.rating < 8.0 ? "#FFD700" : "#00D100"],
      }]
    }

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
        <div className='Rating' style={{color: player.rating < 7.0 ? "orange" : player.rating < 8.0 ? "#FFD700" : "#00D100"}}>
        <AnimatedNumber value={player.rating}/>
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
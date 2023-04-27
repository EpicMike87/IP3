import React from "react";
import playerImage from "../images/homepage2.jpg";
import playerSearch from "../images/playersearch.PNG";
import playerSearchResult from "../images/playersearchresult.PNG";
import teamProfileImage from "../images/teamprof.PNG";
import teamProfileImage2 from "../images/teamprof2.PNG";
import b11Pic from "../images/b11pic.PNG";
import compareDemo from "../images/playercomparedemo.PNG";
import teamCompareDemo from "../images/teamcomparedemo.PNG";

function About() {
    return (
        <main className="About">
            <div className="backgroundImage" role="banner">
                <img src={playerImage} alt="teamPageImage" className="teamPageImage"></img>
                <div class="backgroundOverlay"></div>
                <div class="pageHeaderBox" role="heading"><h1>About Best 11</h1></div>
            </div>
            <section className="aboutContent" style={{ display: "block", height: '100%', textAlign: 'center' }}>
                <h1>What is Best 11?</h1>
                <p>Best 11 is an online application that provides statistics for the teams, players, and fixtures in Scottish Premier League football.</p>
                <p>This includes a variety of features, such as our player section, team section, team and player comparisons and best 11 SPL team feature.</p>
                <p>A full breakdown and explanation of our features and how to use them is below:</p>
                <h1>Features</h1>
                <div className="colBox" style={{ border: '1px solid lightgray', padding: '0.5rem', borderRadius: '5px', margin: '0.3rem auto' }}>
                    <h2>Player Search</h2>
                    <div className="rowBox">
                        <div style={{ padding: '1rem', margin: 'auto', textAlign: 'left' }}>

                            <p>We curate a database of players from the SPFL and their related data, including goals scored, assists, tackles, blocks, saves etc.</p>
                            <p>On our player page (accessible from the navigation bar at the top of the page), you will see a search bar displayed.</p>
                            <p>This search bar allows you to filter a list of SPFL players by name as you type. </p>
                            <p>Once you've found the player you'd like to view statistics for, click on the player in the displayed search results, and their statistics will be displayed.</p></div>
                        <img src={playerSearch} alt="teamPageImage"></img>
                        <img src={playerSearchResult} alt="teamPageImage"></img>
                    </div>
                </div>
                <div className="colBox" style={{ border: '1px solid lightgray', padding: '0.5rem', borderRadius: '5px', margin: '0.3rem auto' }}>
                    <h2>Team Search</h2>
                    <div className="rowBox">
                        <img src={teamProfileImage} alt="teamPageImage"></img>
                        <div style={{ padding: '1rem', margin: 'auto', textAlign: 'left' }}>

                            <p>We curate a database of teams from the SPFL and their related data, including fixtures and scores, current squads etc.</p>
                            <p>On our Team page (accessible from the navigation bar at the top of the page), you will see a search bar displayed.</p>
                            <p>This search bar allows you to search for an SPFL team. </p>
                            <p>The team stats will be displayed, along with grounds information, a summary of their current performance and standing, past and upcoming fixtures and squad.</p>
                            <p>Upcoming fixtures will also include our prediction of which team is the most likely to win. </p>
                            <p>This is provided by our machine learning model, trained on 6+ seasons worth of fixture data.</p></div>

                        <img src={teamProfileImage2} alt="teamPageImage"></img>
                    </div>
                </div>
                <div className="colBox" style={{ border: '1px solid lightgray', padding: '0.5rem', borderRadius: '5px', margin: '0.3rem auto' }}>
                    <h2>Best 11 in SPFL</h2>
                    <div className="rowBox">
                        <div style={{ padding: '1rem', margin: 'auto', textAlign: 'left' }}>

                            <p>On our ranking page, we show a view of the Best 11 possible squad of current players in the SPFL.</p>
                            <p>This is determined by their player rating, which takes into account a number of metrics.</p>
                            <p>A drop down allows you to change this team into one of several popular formations.</p>
                        </div>

                        <img src={b11Pic} alt="teamPageImage"></img>
                    </div>
                </div>
                <div className="colBox" style={{ border: '1px solid lightgray', padding: '0.5rem', borderRadius: '5px', margin: '0.3rem auto' }}>
                    <h2>Player Comparison</h2>
                    <div className="rowBox">
                    <img src={compareDemo} alt="teamPageImage"></img>
                        <div style={{ padding: '1rem', margin: 'auto', textAlign: 'left' }}>

                            <p>Another feature of our ranking page is the player comparison feature.</p>
                            <p>This feature allows two players to be searched and displayed for comparison.</p>
                            <p>Each player is searched for by name in the search bar and dragged to one of two rectangles to display their information.</p>
                        </div>
                    </div>
                </div>
                <div className="colBox" style={{ border: '1px solid lightgray', padding: '0.5rem', borderRadius: '5px', margin: '0.3rem auto' }}>
                    <h2>Team Comparison</h2>
                    <div className="rowBox">

                        <div style={{ padding: '1rem', margin: 'auto', textAlign: 'left' }}>

                            <p>Similar to our player comparison feature is our team comparison feature.</p>
                            <p>This feature allows two team to be searched and displayed for comparison, and works exactly the same as the player comparison, allowing two teams' statistics to be compared.</p>
                        </div>
                        <img src={teamCompareDemo} alt="teamPageImage"></img>
                    </div>
                    
                </div>
            </section>
        </main>
    )
}

export default About;
import React from "react";
import playerImage from "../images/homepage2.jpg";

function About() {
    return (
        <main className="About">
            <div className="backgroundImage" role="banner">
                <img src={playerImage} alt="teamPageImage" className="teamPageImage"></img>
                <div class="backgroundOverlay"></div>
                <div class="pageHeaderBox" role="heading"><h1>About Us</h1></div>
            </div>
        </main>
    )
}

export default About;
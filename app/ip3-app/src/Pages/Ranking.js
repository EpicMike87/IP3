import React from "react";
import rankingimage2 from "../images/rankingimage2.jpg";
import Tabs from "../Component/TabComponent/Tabs";


function Ranking() {

    return (
        <main className="Ranking">
            <div className="backgroundImageRanking" role="banner">
                <img className="rankingImage" src={rankingimage2} alt="Ranking Image" />
            </div>
            <section className="rankingMain">
                <section className="componentTabSection">
                    {/* <h1>This is the Component Tab Section</h1> */}
                    <div className="TabComponent">
                        <Tabs />
                    </div>

                </section>

            </section>

        </main>
    );

};
export default Ranking;
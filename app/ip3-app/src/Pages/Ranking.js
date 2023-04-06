import React from "react";
import rankingimage2 from "../images/rankingimage2.jpg";
import Tabs from "../Component/TabComponent/Tabs";


function Ranking() {

    return (
        <div className="Ranking">
            <div className="backgroundImageRanking">
                <img className="rankingImage" src={rankingimage2} alt="Ranking Image" />
            </div>
            <div className="rankingMain">
                <div className="componentTabSection">
                    {/* <h1>This is the Component Tab Section</h1> */}
                    <div className="TabComponent">
                        <Tabs />
                    </div>

                </div>

            </div>

        </div>
    );

};
export default Ranking;
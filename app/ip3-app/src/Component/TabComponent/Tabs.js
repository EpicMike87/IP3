import React, { useState } from "react";
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";
import "../../css/Tabs.css";
import Best11 from "./AllTabs/Best11";
import PlayerCompare from "../PlayerCompare";
import TeamCompare from "../TeamCompare";
 
const Tabs = () => {
  const [activeTab, setActiveTab] = useState("Best 11");
 
  return (
    <div className="Tabs">
      <ul className="Tabnav">
        <TabNavItem title="Best 11" id="Best 11" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title="Player Comparison" id="Player Comparison" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title="Team Comparison" id="Team Comparison" activeTab={activeTab} setActiveTab={setActiveTab}/>
      </ul>
 
      <nav className="outlet">
        <TabContent id="Best 11" activeTab={activeTab}>
          <Best11 />
        </TabContent>
        <TabContent id="Player Comparison" activeTab={activeTab}>
          <PlayerCompare />
        </TabContent>
        <TabContent id="Team Comparison" activeTab={activeTab}>
          <TeamCompare />
        </TabContent>
      </nav>
    </div>
  );
};
 
export default Tabs;
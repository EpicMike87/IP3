import React, { useState } from "react";
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";
import "../../css/Tabs.css";
import FirstTab from "./AllTabs/FirstTab";
import PlayerCompare from "../PlayerCompare";
 
const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");
 
  return (
    <div className="Tabs">
      <ul className="Tabnav">
        <TabNavItem title="Best 11" id="Best 11" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title="Player Comparison" id="Player Comparison" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title="Team Comparison" id="Team Comparison" activeTab={activeTab} setActiveTab={setActiveTab}/>
      </ul>
 
      <div className="outlet">
        <TabContent id="Best 11" activeTab={activeTab}>
          <FirstTab />
        </TabContent>
        <TabContent id="Player Comparison" activeTab={activeTab}>
          <PlayerCompare />
        </TabContent>
        <TabContent id="Team Comparison" activeTab={activeTab}>
          
        </TabContent>
      </div>
    </div>
  );
};
 
export default Tabs;
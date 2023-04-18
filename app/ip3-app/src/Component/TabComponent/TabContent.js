import React from "react";
 
const TabContent = ({id, activeTab, children}) => {
 return (
   activeTab === id ? <section className="TabContent">
     { children }
   </section>
   : null
 );
};
 
export default TabContent;
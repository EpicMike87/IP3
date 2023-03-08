// This is the Component that defines the search bar.

import searchIcon from '../images/search.png';

function SearchBar({keyword, onChange, fun}){
    const BarStyle = {width:"20rem",background:"#F0F0F0", border:"none", padding:"0.5rem"};
    const searchIconStyle = {width:"20px", background:"#F0F0F0", border:"none", margin:"0px"};
    return (
        <div className='searchBar'>
            <input 
            style={BarStyle}
            key="search-bar"
            value={keyword}
            placeholder={"Enter Player Name"}
            onChange={(e) => onChange(e.target.value)}
            />
            <img src={searchIcon} style={searchIconStyle} onClick={fun}/>
        </div>
    );
  }
  
  export default SearchBar;
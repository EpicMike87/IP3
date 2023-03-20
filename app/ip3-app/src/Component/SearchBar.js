// This is the Component that defines the search bar.

function SearchBar({keyword, onChange, fun}){
    return (
        <div className='searchBarContainer'>
            <div className='searchBar'>
                <input 
                className='searchBarInput'
                key="search-bar"
                value={keyword}
                placeholder={"Enter Player Name"}
                onChange={(e) => onChange(e.target.value)}
                />
                <div className='iconSearchContainer'>
                <svg  id='searchIconStyle' xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px" onClick={fun} >
                    <path d="M 21 3 C 11.6 3 4 10.6 4 20 C 4 29.4 11.6 37 21 37 C 24.354553 37 27.47104 36.01984 30.103516 34.347656 L 42.378906 46.621094 L 46.621094 42.378906 L 34.523438 30.279297 C 36.695733 27.423994 38 23.870646 38 20 C 38 10.6 30.4 3 21 3 z M 21 7 C 28.2 7 34 12.8 34 20 C 34 27.2 28.2 33 21 33 C 13.8 33 8 27.2 8 20 C 8 12.8 13.8 7 21 7 z"/>
                </svg>
                </div>
            </div>
        </div>
    );
  }
  
  export default SearchBar;
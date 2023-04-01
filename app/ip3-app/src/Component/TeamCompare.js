import { React, useState, useEffect } from "react";
import Api from '../Helpers/Api';
import SearchBar from "./SearchBar";
import { useDrop } from "react-dnd";
import PlayerCard from "./PlayerCard";
import { TeamResultsCard } from "./TeamResultsCard";
import TeamCard from "./TeamCard";

function TeamCompare(){

    const [team, setTeam] = useState("");
    const [teams, setTeams] = useState([]);
    const [showElement, setShowElement] = useState(false);

    const [basket, setBasket] = useState([]);
    const [basket2, setBasket2] = useState([]);

    const [selectedTeams, setSelectedTeams] = useState([]);

    const [dropTeam1, setDropTeam1] = useState("");
    const [dropTeam2, setDropTeam2] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await Api.get(`team/list/${team}`)
                changeSelectionVisibility(true);
                if (team == "") {
                    changeSelectionVisibility(false);
                }
                setTeams(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData()
    }, [team]);

    document.addEventListener('click', function (event) {
        const searchBar = document.getElementsByClassName('searchBar')[0];
        const outsideClick = !searchBar.contains(event.target);
        if (outsideClick) changeSelectionVisibility(false);
        else if (team != "") changeSelectionVisibility(true);
    });

    const searchTeam = () => {
        console.log("search button clicked");
        Api.get(`team/list/${team}`)
            .then(res => {
                console.log(res.data);
                setTeams(res.data);
                changeSelectionVisibility(true);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const [{ isOver }, dropRef] = useDrop({
        accept: 'team',
        drop: (item) => {
            setBasket([]);
            setBasket((basket) =>
                !basket.includes(item.team) ? [...basket, item.team] : basket);
            selectedTeams.push(item.team);
            setDropTeam1(item.team);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        }),
    });


    const [{ isOver2 }, dropRef2] = useDrop({
        accept: 'team',
        drop: (item) => {
            setBasket2([]);
            setBasket2((basket2) =>
                !basket2.includes(item.team) ? [...basket2, item.team] : basket2);
            selectedTeams.push(item.team);
            setDropTeam2(item.team);
        },
        collect: (monitor) => ({
            isOver2: monitor.isOver()
        }),
    });

    const setToFalse = (e) => {
        setShowElement(false);
    };

    const changeSelectionVisibility = (on) => {
        const searchBar = document.getElementsByClassName('searchBarInput')[0];

        if (on) {
            setShowElement(true);
            searchBar.style.borderBottomLeftRadius = "0";
            searchBar.style.borderBottom = "1px dashed lightgrey";
        }
        else {
            setShowElement(false);
            searchBar.style.borderBottomLeftRadius = "8px";
            searchBar.style.borderBottom = "none";
        }
    }

    return (
        <div className="Player" onClick={e => setToFalse(e)}>
            <SearchBar keyword={team} onChange={setTeam} fun={searchTeam} />
            <div id="playerSelection" style={{ maxHeight: "300px" }}>
                <table className="playerTable sortable">
                    <tbody>
                        {showElement ? teams.map(team => <TeamResultsCard draggable team={team} />) : <div></div>}
                    </tbody>
                </table>
            </div>
            <div className="CompareSection">
                <div className="CardSections">
                    <div className={basket == "" ? "CardSection1" : "CardSection1WithBasket"} ref={dropRef}>
                        {basket.map(team => <TeamCard team={team} />)}
                        {isOver && !basket.includes(dropTeam1) ? <p>Drop Player Here</p> : <p style={{display: "none"}}></p>}
                        {!isOver && !basket.includes(dropTeam1) ? <p>Search and Drag Player Here</p> : <p style={{display: "none"}}></p>}


                    </div>
                    <div className={basket2 == "" ? "CardSection2" : "CardSection2WithBasket"} ref={dropRef2}>
                        {basket2.map(team => <TeamCard team={team} />)}  
                        {isOver2 && !basket2.includes(dropTeam2) ? <p>Drop Player Here</p> : <p style={{display: "none"}}></p>}
                        {!isOver2 && !basket2.includes(dropTeam2) ? <p>Search and Drag Player Here</p> : <p style={{display: "none"}}></p>}

                    </div>
                </div>
            </div>


        </div>
    )
}

export default TeamCompare; 
import { React, useState, useEffect } from "react";
import Api from '../Helpers/Api';
import SearchBar from "./SearchBar";
import { useDrop } from "react-dnd";
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

    const [team1CompareResults, setTeam1CompareResults] = useState([]);
    const [team2CompareResults, setTeam2CompareResults] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await Api.get(`team/list/${team}`)
                changeSelectionVisibility(true);
                if (team == "") {
                    changeSelectionVisibility(false);
                }
                setTeams(data);
                // console.log(data);
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
                // console.log(res.data);
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
            // selectedTeams.push(item.team);
            selectedTeams[0] = item.team;
            findLast5Fix(selectedTeams);
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
            // selectedTeams.push(item.team);
            selectedTeams[1] = item.team;
            findLast5Fix(selectedTeams);
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

    const findLast5Fix = (teams) => {
        if(teams.length == 2){

            const team1 = teams[0].teamName;
            const team2 = teams[1].teamName;

            const last5Team1 = teams[0].fixtures.filter(f =>((f.awayTeamName == team1 || f.homeTeamName == team1) && (f.awayTeamName == team2 || f.homeTeamName == team2) && (f.fullTimeResult != '?'))).slice(0, 5)
            const resultsTeam1 = new Array();
            for (let i = 0; i < last5Team1.length; i++) {
                if (last5Team1[i].fullTimeResult == 'D') {
                    resultsTeam1.push('D');
                }
                else {
                    if ((last5Team1[i].fullTimeResult == 'H' && team1 == last5Team1[i].homeTeamName) || (last5Team1[i].fullTimeResult == 'A' && team1 == last5Team1[i].awayTeamName))
                    resultsTeam1.push('W')
                    else resultsTeam1.push('L')
                }
            }
            console.log("results for Team 1: "+resultsTeam1);
            setTeam1CompareResults(resultsTeam1);

            const last5Team2 = teams[1].fixtures.filter(f =>((f.awayTeamName == team1 || f.homeTeamName == team1) && (f.awayTeamName == team2 || f.homeTeamName == team2) && (f.fullTimeResult != '?'))).slice(0, 5)
            const resultsTeam2 = new Array();
            for (let i = 0; i < last5Team2.length; i++) {
                if (last5Team2[i].fullTimeResult == 'D') {
                    resultsTeam2.push('D');
                }
                else {
                    if ((last5Team2[i].fullTimeResult == 'H' && team2 == last5Team2[i].homeTeamName) || (last5Team2[i].fullTimeResult == 'A' && team2 == last5Team2[i].awayTeamName))
                    resultsTeam2.push('W')
                    else resultsTeam2.push('L')
                }
            }
            console.log("results for Team 2: "+resultsTeam2);
            setTeam2CompareResults(resultsTeam2); 

        } else if (teams.length > 2){
            console.log("Too many selected teams for last 5 comparsions");
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
                        {basket.map(team => <TeamCard team={team} last5H2H={team1CompareResults}/>)}
                        {isOver && !basket.includes(dropTeam1) ? <p>Drop Team Here</p> : <p style={{display: "none"}}></p>}
                        {!isOver && !basket.includes(dropTeam1) ? <p>Search and Drag Team Here</p> : <p style={{display: "none"}}></p>}

                    </div>
                    <div className={basket2 == "" ? "CardSection2" : "CardSection2WithBasket"} ref={dropRef2}>
                        {basket2.map(team => <TeamCard team={team}  last5H2H={team2CompareResults}/>)}  
                        {isOver2 && !basket2.includes(dropTeam2) ? <p>Drop Team Here</p> : <p style={{display: "none"}}></p>}
                        {!isOver2 && !basket2.includes(dropTeam2) ? <p>Search and Drag Team Here</p> : <p style={{display: "none"}}></p>}


                    </div>
                </div>
            </div>


        </div>
    )
}

export default TeamCompare; 
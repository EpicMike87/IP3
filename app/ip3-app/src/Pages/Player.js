import { useEffect, useState } from 'react';
import Api from '../Helpers/Api';
import SearchBar from "../Component/SearchBar";

function Player() {
    const [playerName, setPlayerName] = useState("");
    const [players, setPlayers] = useState([]);
    const [playerInfo, setPlayerInfo] = useState([])

    const searchPlayer = () => {
        Api.get(`search-player/${playerName}`)
            .then(res => {
                console.log(res.data);
                setPlayers(res.data);

            })
            .catch(err => {
                console.log(err);
            });

        console.log(players);
    }

    const updatePlayer = (playerName) => {
        setPlayerName(playerName);
    }

    const showDetail = (playerFullName) => {
        Api.get(`search-player/${playerFullName}`)
            .then(res => {
                console.log(res.data);
                setPlayerInfo(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        console.log(playerInfo);

    }

    // <td><button onClick={(e) => showDetail(`${playersData.firstName} ${playersData.lastName}`)} data-toggle="modal" data-target="#myModal">Get Details</button></td>


    return (
        <div>
            <h1>This is the Managers page</h1>
            <SearchBar keyword={playerName} placeholders={"Please Enter Player Name"} onChange={updatePlayer} fun={searchPlayer} />



            <h3>Select a Player</h3>

            <table>
                <thead >
                    <tr>
                        <th>No</th>
                        <th>Player</th>
                        <th>Name</th>
                        <th>age</th>
                        <th>team</th>
                    </tr>
                </thead>
                <tbody>

                    {players.map((playersData, index) =>
                        <tr key={index} onClick={(e) => showDetail(`${playersData.firstName} ${playersData.lastName}`)} data-toggle="modal" data-target="#myModal" className='hoverRows'>
                            <td>{playersData.idNo}</td>
                            <td><img src={playersData.photoUrl} ></img></td>
                            <td>{`${playersData.firstName} ${playersData.lastName}`}</td>
                            <td>{playersData.age}</td>
                            <td>{playersData.team}</td>
                        </tr>
                    )}
                </tbody>
            </table>


            <br></br>


            <h3>Select a Player</h3>
            <table >
                <thead >
                    <tr>
                        <th>No</th>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>age</th>
                        <th>team</th>
                    </tr>
                </thead>
                <tbody>

                    {playerInfo.map((playersData, index) =>
                        <tr key={index}>
                            <td>{playersData.idNo}</td>
                            <td>{playersData.firstName}</td>
                            <td>{playersData.lastName}</td>
                            <td>{playersData.age}</td>
                            <td>{playersData.team}</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <br></br>
            <br></br>
        </div>
    )
}

export default Player; 
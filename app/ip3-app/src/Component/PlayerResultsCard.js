import React, { useState } from "react";
import { DragPreviewImage, useDrag } from "react-dnd";

export const PlayerResultsCard = ( {player}) => {

    const [{ isDragging }, dragRef, preview] = useDrag({
        type: 'player',
        item:  {player},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        

    });


    return(
        <>
        <DragPreviewImage connect={preview} src={player.photoUrl} style={{width: "50%"}} />
        <div className='player-results-card' ref={dragRef} style={{
            opacity: isDragging ? 0.5 : 1,
            }}
        >
            {/* {selectedPlayer ?  */}
            <div className="liEls"> 
                <img className="imagePlayer" src={player.photoUrl}/>
                <div className="HeaderBox">
                    <h4 className="playerName">{`${player.firstName} ${player.lastName}`}</h4>
                    <p className="playerTeam">{`${player.team}`}</p>
                </div>
                <div className="statistics">
                    <span className="matchesPlayed">
                    <h5>Matches Played </h5>
                    <p>{`${player.matchesPlayed}`}</p>
                    </span>
                    <span className="playerAge">
                    <h5>Age </h5>
                    <p>{`${player.age}`}</p>
                    </span>
                    <span className="playerPosition">
                    <h5>Position </h5>
                    <p>{`${player.position}`}</p>
                    </span>
                </div>
            </div>
            {/* {isDragging && '😱'} */}
        </div>
        </>
    );
};


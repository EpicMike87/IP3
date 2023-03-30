import React, { useState } from "react";
import { DragPreviewImage, useDrag } from "react-dnd";

export const PlayerResultsCard = ({ player }) => {

    const [{ isDragging }, dragRef, preview] = useDrag({
        type: 'player',
        item: { player },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),


    });


    return (
        <>
            <DragPreviewImage connect={preview} src={player.photoUrl} style={{ width: "50%" }} />
            <tr ref={dragRef} style={{
                opacity: isDragging ? 0.5 : 1,
            }}
            >
                {/* {selectedPlayer ?  */}
                <td><img src={player.photoUrl} class="searchImage"></img></td>
                <td>{`${player.firstName} ${player.lastName}`}</td>
                <td>{player.position}</td>
                <td>{player.team}</td>
                {/* {isDragging && '😱'} */}
            </tr>
        </>
    );
};


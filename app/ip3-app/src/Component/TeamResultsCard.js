import React, { useState } from "react";
import { DragPreviewImage, useDrag } from "react-dnd";

export const TeamResultsCard = ({ team }) => {

    const [{ isDragging }, dragRef, preview] = useDrag({
        type: 'team',
        item: { team },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),


    });


    return (
        <>
            <DragPreviewImage connect={preview} src={team.photoUrl} style={{ width: "50%" }} />
            <tr ref={dragRef} style={{
                opacity: isDragging ? 0.5 : 1,
            }}
            >
                {/* {selectedPlayer ?  */}
                <td><img src={team.photoUrl} class="searchImage"></img></td>
                <td>{`${team.teamName}`}</td>
                <td>{team.points}</td>
                <td>{team.rank}</td>
                {/* {isDragging && '😱'} */}
            </tr>
        </>
    );
};


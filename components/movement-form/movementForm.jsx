import React, { useState, useRef, useEffect } from 'react'
import styles from './MovementForm.module.scss'

const MovementForm = ({refreshData}) => {
    // const [formMovementValues, setMovementValues] = useState({ name: '', weight: 0, sets: 0, reps: 0 });
    const [movementName, setMovementName] = useState("Something useful");
    const [weight, setWeight] = useState(0);
    const [sets, setSets] = useState(0);
    const [reps, setReps] = useState(0);

    function handleNameChange (e) {
        setMovementName(e.target.value);
    }

    function handleWeightChange (e) {
        setWeight(e.target.value);
    }

    function handleSetsChange (e) {
        setSets(e.target.value);
    }

    function handleRepsChange (e) {
        setReps(e.target.value);
    }

    function movementSubmit(e) {
        // /movement/add/:routineid/:setid/:movementName/:weight/:sets/:reps
        e.preventDefault();
        const url = `http://localhost:3333/movement/add/4/1/${movementName}/${weight}/${sets}/${reps}`;
        // setMovementName(url);

        fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'same-origin'
        }).then(() => {
            refreshData();
        });
    }

    return (
        <form action="" onSubmit={movementSubmit}>
            <h1 className="name-output">{movementName}</h1>
            <p className="weight-output">{ weight }</p>
            <p className="sets-output">{ sets }</p>
            <p className="reps-output">{ reps }</p>
            <input type="text" onChange={handleNameChange} value={movementName} placeholder="Name" id="name"/>
            <input type="number" onChange={handleWeightChange} value={weight} placeholder="Weight" id="weight"/>
            <input type="number" onChange={handleSetsChange} value={sets} placeholder="Sets" id="sets"/>
            <input type="number" onChange={handleRepsChange} value={reps} placeholder="Reps" id="reps"/>
            <input type="submit"/>
        </form>
    )
};

export default MovementForm;
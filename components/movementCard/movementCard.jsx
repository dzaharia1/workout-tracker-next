import React, { useState, useRef, useEffect } from 'react'
import styles from './movementCard.module.scss'
import Overlay from '../Overlay'
import MovementJournal from '../MovementJournal'

const movementCard = ({displayName, slug, instruction, last_logged, weight, sets, reps, movementId, routineId, today, databaseUrl }) => {
    let [movementJournal, setMovementJournal] = useState([]);
    let [cardWeight, setCardWeight] = useState(weight);
    let [cardSets, setCardSets] = useState(sets);
    let [cardReps, setCardReps] = useState(reps);
    let [cardLastLogged, setCardLastLogged] = useState(last_logged);
    let [cardInstruction, setCardInstruction] = useState(instruction);

    function loadJournal() {
        const url = `${databaseUrl}/journal/movement/${movementId}`;
        console.log(url);
        fetch(url)
        .then(response => response.json())
        .then((data) => {
            setMovementJournal(data);
        });
    }

    function toggleEditForm() {
        const editFormOverlay = document.querySelector
    }

    function setCardInfo(Instruction, Weight, Sets, Reps) {
        setCardWeight(Weight)
        setCardSets(Sets)
        setCardReps(Reps)
        setCardInstruction(Instruction)
        setCardLastLogged(today)
    }

    return <div className={styles["movement-card"]}>
        <div className={styles["movement-card__header"]}>
            <h3>{ displayName }</h3>
            <div className={styles["movement-card__button-row"]}>
                <Overlay onShow={loadJournal} title={`Journal - ${displayName}`} triggerIcon="/img/journal.svg" id={`journal-${slug}`} >
                    <MovementJournal journalData={movementJournal}
                                     movementId={movementId}
                                     routineId={routineId}
                                     setCardInfo={setCardInfo}
                                     today={today}
                                     databaseUrl={databaseUrl}
                                     loadJournal={loadJournal} />
                </Overlay>
                <Overlay title={`Edit ${displayName}`} triggerIcon="/img/edit.svg" id={`editor-${slug}`}></Overlay>
            </div>
        </div>
        <div className={styles["movement-card__attributes"]}>
            <div className={`${styles["movement-card__attribute"]} ${styles["movement-card__attribute--date"]}`}>
                <p>{ cardLastLogged }</p>
                <h4>last logged</h4>
            </div>
            <div className={styles["movement-card__attribute"]}>
                <p>{ cardWeight }</p>
                <h4>lbs</h4>
            </div>
            <div className={styles["movement-card__attribute"]}>
                <p>{ cardSets }</p>
                <h4>sets</h4>
            </div>
            <div className={styles["movement-card__attribute"]}>
                <p>{ cardReps }</p>
                <h4>reps</h4>
            </div>
        </div>
    </div>
}

export default movementCard;
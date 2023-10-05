import React, { useState, useRef, useEffect } from 'react'
import styles from './movementCard.module.scss'
import Overlay from '../Overlay'
import MovementJournal from '../MovementJournal'

const movementCard = ({displayName, slug, instruction, last_logged, weight, sets, reps, movementId }) => {
    let [movementJournal, setMovementJournal] = useState([]);

    function loadJournal() {
        const url = `http://localhost:3333/journal/movement/${movementId}`;
        fetch(url)
        .then(response => response.json())
        .then((data) => {
            setMovementJournal(data);
        });
    }

    function toggleEditForm() {
        const editFormOverlay = document.querySelector
    }

    return <div className={styles["movement-card"]}>
        <div className={styles["movement-card__header"]}>
            <h3>{ displayName }</h3>
            <div className={styles["movement-card__button-row"]}>
                <Overlay onShow={loadJournal} title={`Journal - ${displayName}`} triggerIcon="/img/journal.svg" id={`journal-${slug}`} >
                    <MovementJournal journalData={movementJournal} movementId={movementId}></MovementJournal>
                </Overlay>
                <Overlay title={`Edit ${displayName}`} triggerIcon="/img/edit.svg" id={`editor-${slug}`}></Overlay>
            </div>
        </div>
        <div className={styles["movement-card__attributes"]}>
            <div className={styles["movement-card__attribute"]}>
                <p>{ weight }</p>
                <h4>lbs</h4>
            </div>
            <div className={styles["movement-card__attribute"]}>
                <p>{ sets }</p>
                <h4>sets</h4>
            </div>
            <div className={styles["movement-card__attribute"]}>
                <p>{ reps }</p>
                <h4>reps</h4>
            </div>
            <div className={`${styles["movement-card__attribute"]} ${styles["movement-card__attribute--date"]}`}>
                <p>{ last_logged }</p>
                <h4>last logged</h4>
            </div>
        </div>
    </div>
}

export default movementCard;
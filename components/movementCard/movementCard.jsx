import React, { useState, useRef, useEffect } from 'react'
import styles from './movementCard.module.scss'
import Overlay from '../Overlay'
import Button from '../Button'

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
                    <MovementJournal journalData={movementJournal}></MovementJournal>
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

const MovementJournal = ({journalData}) => {
    console.log(journalData);

    return <div className={styles["movement-journal"]}>
        {/* <form className="movement-journal__add-entry"></form> */}
        <div className={styles['movement-journal__button-row']}>
            <Button label="Add instruction" />
            <Button label="Add entry" />
        </div>
        <ul className={styles["movement-journal__journal"]}>
            { journalData.map((entry, i) => {
                return <li className={styles["movement-journal__entry"]}>
                    {/* <p className={styles["movement-journal__date"]}>{entry.completion_date}</p> */}
                    <div className={`${styles["movement-card__attribute"]} ${styles["movement-card__attribute--date"]}`}>
                        <p>{entry.to_char}</p>
                        <h4>completed</h4>
                    </div>
                    <div className={styles["movement-card__attribute"]}>
                        <p>{entry.weight}</p>
                        <h4>lbs</h4>
                    </div>
                    <div className={styles["movement-card__attribute"]}>
                        <p>{entry.sets}</p>
                        <h4>sets</h4>
                    </div>
                    <div className={styles["movement-card__attribute"]}>
                        <p>{entry.reps}</p>
                        <h4>reps</h4>
                    </div>
                </li>
            }) }
        </ul>
    </div>
}

export default movementCard;
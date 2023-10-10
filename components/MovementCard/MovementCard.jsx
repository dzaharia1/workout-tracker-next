import React, { useState, useRef, useEffect } from 'react'
import styles from './movementCard.module.scss'
import Overlay from '../Overlay'
import MovementJournal from '../MovementJournal'
import EditMovement from '../EditMovement'

const MovementCard = ({displayName, slug, instruction, last_logged, weight, sets, reps, movementId, routineId, setId, superSets, today, apiUrl, refreshWorkoutData }) => {
    let [movementJournal, setMovementJournal] = useState([]);

    function loadJournal() {
        const url = `${apiUrl}/journal/movement/${movementId}`;
        console.log(url);
        fetch(url)
        .then(response => response.json())
        .then((data) => {
            setMovementJournal(data);
        });
    }

    return <div className={styles["movement-card"]}>
        <div className={styles["movement-card__header"]}>
            <div className={last_logged === today ? styles['super-set__complete-indicator--complete'] : styles['super-set__complete-indicator']}></div>
            <h3>{ displayName }</h3>
            <div className={styles["movement-card__button-row"]}>
                <Overlay onShow={loadJournal} title={displayName} triggerIcon="/img/journal.svg" id={`journal-${slug}`} sizing="fill" >
                    <MovementJournal journalData={movementJournal}
                        movementId={movementId}
                        routineId={routineId}
                        today={today}
                        apiUrl={apiUrl}
                        loadJournal={loadJournal}
                        refreshWorkoutData={refreshWorkoutData} />
                </Overlay>
                <Overlay title={`Edit ${displayName}`} triggerIcon="/img/edit.svg" id={`editor-${slug}`} sizing="hug">
                    <EditMovement movementId={movementId}
                        movementName={displayName}
                        setId={setId}
                        apiUrl={apiUrl}
                        superSets={superSets}
                        refreshWorkoutData={refreshWorkoutData}
                        routineId={routineId} />
                </Overlay>
            </div>
        </div>
        <div className={styles["movement-card__attributes"]}>
            {instruction ? 
                <div className={styles['movement-card__attribute--date']}><span className={styles['movement-card__completed-indicator']}>Instruction</span></div>
                :
                <div className={`${styles["movement-card__attribute"]} ${styles["movement-card__attribute--date"]}`}>
                    <p>{ last_logged }</p>
                    <h4>last logged</h4>
                </div>
            }
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
        </div>
    </div>
}

export default MovementCard;
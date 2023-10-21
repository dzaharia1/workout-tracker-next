import React, { useState, useRef, useEffect, useContext, createContext } from 'react';
import { AppContext } from '../AppContext';
import styles from './movementCard.module.scss';
import Overlay from '../Overlay';
import MovementJournal from '../MovementJournal';
import EditMovement from '../EditMovement';

const MovementCard = ({movementInfo, setId, superSets }) => {
    let [movementJournal, setMovementJournal] = useState([]);
    const { apiUrl, today } = useContext(AppContext);

    function loadJournal() {
        const url = `${apiUrl}/journal/movement/${movementInfo.movementId}`;
        console.log(url);
        fetch(url)
        .then(response => response.json())
        .then((data) => {
            setMovementJournal(data);
        });
    }

    return <div className={styles["movement-card"]}>
        <div className={styles["movement-card__header"]}>
            <div className={movementInfo.last_logged === today ? styles['super-set__complete-indicator--complete'] : styles['super-set__complete-indicator']}></div>
            <h3>{ movementInfo.displayName }</h3>
            <div className={styles["movement-card__button-row"]}>
                <Overlay
                    onShow={loadJournal}
                    title={movementInfo.displayName}
                    triggerIcon="/img/journal.svg"
                    sizing="fill" >
                    <MovementJournal journalData={movementJournal}
                        movementId={movementInfo.movementId}
                        routineId={movementInfo.routineId}
                        loadJournal={loadJournal} />
                </Overlay>
                <Overlay
                    title={`Edit ${movementInfo.displayName}`}
                    triggerIcon="/img/edit.svg"
                    sizing="hug">
                    <EditMovement movementId={movementInfo.movementId}
                        movementName={movementInfo.displayName}
                        setId={setId}
                        superSets={superSets} />
                </Overlay>
            </div>
        </div>
        <div className={styles["movement-card__attributes"]}>
            {movementInfo.instruction ? 
                <div className={styles['movement-card__attribute--date']}><span className={styles['movement-card__completed-indicator']}>Instruction</span></div>
                :
                <div className={`${styles["movement-card__attribute"]} ${styles["movement-card__attribute--date"]}`}>
                    <p>{ movementInfo.last_logged }</p>
                    <h4>last logged</h4>
                </div>
            }
            <div className={styles["movement-card__attribute"]}>
                <p>{ movementInfo.weight }</p>
                <h4>lbs</h4>
            </div>
            <div className={styles["movement-card__attribute"]}>
                <p>{ movementInfo.sets }</p>
                <h4>sets</h4>
            </div>
            <div className={styles["movement-card__attribute"]}>
                <p>{ movementInfo.reps }</p>
                <h4>reps</h4>
            </div>
        </div>
    </div>
}

export default MovementCard;
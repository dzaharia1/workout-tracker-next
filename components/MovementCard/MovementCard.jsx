import React, { useState, useRef, useEffect, useContext, createContext } from 'react';
import { AppContext } from '../AppContext';
import styles from './movementCard.module.scss';
import Overlay from '../Overlay';
import MovementJournal from '../MovementJournal';
import EditMovement from '../EditMovement';
import MovementAttributes from '../MovementAttributes';
import Badge from '../Badge';

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
            {movementInfo.last_logged === today && <div className={styles['movement-card__completed-indicator']}><Badge type="complete" /></div>}
            <h3>{ movementInfo.displayName }</h3>
            <div className={styles["movement-card__button-row"]}>
                <Overlay
                    title={`Edit ${movementInfo.displayName}`}
                    triggerIcon="/img/edit.svg"
                    sizing="hug"
                    buttonType="tertiary">
                    <EditMovement movementId={movementInfo.movementId}
                        movementName={movementInfo.displayName}
                        setId={setId}
                        superSets={superSets} />
                </Overlay>
                <Overlay
                    onShow={loadJournal}
                    title={movementInfo.displayName}
                    triggerIcon="/img/journal.svg"
                    sizing="fill"
                    buttonType="tertiary" >
                    <MovementJournal journalData={movementJournal}
                        movementId={movementInfo.movementId}
                        routineId={movementInfo.routineId}
                        loadJournal={loadJournal} />
                </Overlay>
            </div>
        </div>
        <div className={styles['movement-card__attributes-container']}>
            <MovementAttributes last_logged={movementInfo.last_logged}
                weight={movementInfo.weight}
                sets={movementInfo.sets}
                reps={movementInfo.reps}
                instruction={movementInfo.instruction} />
        </div>
    </div>
}

export default MovementCard;
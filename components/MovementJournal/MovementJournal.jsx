import React, { useState, useRef, useContext } from 'react';
import { AppContext } from '../AppContext';
import styles from './MovementJournal.module.scss';
import Button from '../Button'

const MovementJournal = ({journalData, movementId, loadJournal}) => {
    const { apiUrl, routineId, refreshWorkoutData } = useContext(AppContext);
    let entryWeight = useRef();
    let entrySets = useRef();
    let entryReps = useRef();
    let entryInstruction = useRef();
    let entryNote = useRef();
    let [noteFormVisible, setNoteFormVisible] = useState(false);
    let [entryFormVisible, setEntryFormVisible] = useState(false);
    let [buttonRowVisible, setButtonRowVisible] = useState(true);

    function showEntryForm() {
        setEntryFormVisible(true);
        setButtonRowVisible(false);
    }

    function hideEntryForm() {
        setEntryFormVisible(false);
        setButtonRowVisible(true);

        entryInstruction.current.checked = false;
        entryWeight.current.value = '';
        entrySets.current.value = '';
        entryReps.current.value = '';
    }

    function saveEntryForm() {
        const url = `${apiUrl}/journal/addmovement/${movementId}/${routineId}/${entryWeight.current.value}/${entrySets.current.value}/${entryReps.current.value}/${entryInstruction.current.checked}`;

        fetch(url, {
            method: 'POST'
        }).then(() => {
            hideEntryForm();
            loadJournal();
            refreshWorkoutData();
        });
    }

    function showNoteForm() {
        setNoteFormVisible(true);
        setButtonRowVisible(false);
    }

    function hideNoteForm() {
        setNoteFormVisible(false);
        setButtonRowVisible(true);
        entryNote.current.value = '';
    }

    function saveNoteForm() {
        const url = `${apiUrl}/journal/addmovementnote/${routineId}/${movementId}/${entryNote.current.value}`;
        
        fetch(url, {
            method: 'POST'
        }).then(() => {
            hideNoteForm();
            loadJournal();
            refreshWorkoutData();
        });
    }

    return <div className={styles["movement-journal"]}>
        <ul className={styles["movement-journal__journal"]}>
            { journalData.map((entry, i) => {
                if (entry.note) {
                    return <li className={styles["movement-journal__entry"]} key={i}>
                        <div className={`${styles['movement-card__attribute']} ${styles['movement-card__attribute--date']}`}>
                            <h4>Note from {entry.to_char}</h4>
                            <p>{entry.note}</p>
                        </div>
                    </li>
                }
                return <li className={styles["movement-journal__entry"]} key={i}>
                    {entry.instruction ? 
                        <div className={styles['movement-card__attribute--date']}><span className={styles['movement-card__completed-indicator']}>Instruction</span></div>
                        :
                        <div className={`${styles["movement-card__attribute"]} ${styles["movement-card__attribute--date"]}`}>
                            <p>{entry.to_char}</p>
                            <h4>Last logged</h4>
                        </div>
                    }
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
        <div className={`${styles['movement-journal__button-row']} ${buttonRowVisible && styles['movement-journal__button-row--visible']}`} id={`button-row-${movementId}`}>
            <Button label="Add entry" id={`add-entry-${movementId}`} clickHandler={showEntryForm} />
            <Button label="Add note" id={`add-note-${movementId}`} clickHandler={showNoteForm} />
        </div>
        <form action="" className={`${styles['movement-journal__form']} ${entryFormVisible && styles['movement-journal__form--visible']}`} id={`entry-form-${movementId}`}>
            <div className={styles["movement-journal__form-header"]}>
                <p>Add entry</p>
                <label htmlFor="">
                    <input
                        type="checkbox"
                        id={`instruction-${movementId}`}
                        ref={entryInstruction}/>
                    Instruction
                </label>
            </div>
            <div className={styles["movement-journal__form-inputs"]}>
                <label htmlFor="">
                    <input
                        type="number"
                        id={`weight-input-${movementId}`}
                        ref={entryWeight}/>
                    lbs
                </label>
                <label htmlFor="">
                    <input
                        type="number"
                        id={`sets-input-${movementId}`}
                        ref={entrySets}/>
                    sets
                </label>
                <label htmlFor="">
                    <input
                        type="number"
                        id={`reps-input-${movementId}`}
                        ref={entryReps} />
                    reps
                </label>
            </div>
            <div className={styles['movement-journal__form-buttons']}>
                <Button label="Save" id={`${movementId}__entry-save-button`} clickHandler={saveEntryForm} />
                <Button label="Cancel" id={`${movementId}__entry-cancel-button`} clickHandler={hideEntryForm} />
            </div>
        </form>
        <form className={`${styles['movement-journal__form']} ${noteFormVisible && styles['movement-journal__form--visible']}`} id={`note-form-${movementId}`}>
            <div className={styles['movement-journal__form-inputs--note']}>
                <label htmlFor="">
                    <input
                        type="text"
                        placeholder="Note: E.g. deeper stretch"
                        id={`notes-input-${movementId}`}
                        ref={entryNote} />
                </label>
            </div>
            <div className={styles['movement-journal__form-buttons']}>
                <Button label="Save" id={`${movementId}__note-save-button`} clickHandler={saveNoteForm} />
                <Button label="Cancel" id={`${movementId}__note-cancel-button`} clickHandler={hideNoteForm} />
            </div>
        </form>
    </div>
}

export default MovementJournal
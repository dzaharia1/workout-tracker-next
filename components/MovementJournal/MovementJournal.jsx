import React, { useState, useRef, useContext } from 'react';
import { AppContext } from '../AppContext';
import styles from './MovementJournal.module.scss';
import Button from '../Button'
import MovementAttributes from '../MovementAttributes';
import Badge from '../Badge';

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
                        <div className={styles['movement-journal__badge-container']}><Badge type="instruction" icon="/img/instruction.svg" /></div>
                        <div className={`${styles['movement-card__attribute']} ${styles['movement-card__attribute--date']}`}>
                            <p>{entry.note}</p>
                        </div>
                    </li>
                }
                return <li className={styles["movement-journal__entry"]} key={i}>
                    <MovementAttributes last_logged={entry.to_char}
                        weight={entry.weight}
                        sets={entry.sets}
                        reps={entry.reps}
                        instruction={entry.instruction} />
                </li>
            }) }
        </ul>
        <div className={`${styles['movement-journal__button-row']} ${buttonRowVisible && styles['movement-journal__button-row--visible']}`} id={`button-row-${movementId}`}>
            <Button label="Add note"
                id={`add-note-${movementId}`}
                clickHandler={showNoteForm}
                type="tertiary" />
            <Button label="Add entry"
                id={`add-entry-${movementId}`}
                clickHandler={showEntryForm}
                type="primary"
                icon="/img/add--white.svg" />
        </div>
        <form action="" className={`${styles['movement-journal__form']} ${entryFormVisible && styles['movement-journal__form--visible']}`} id={`entry-form-${movementId}`}>
            <label htmlFor="">
                <input
                    type="checkbox"
                    id={`instruction-${movementId}`}
                    ref={entryInstruction}/>
                Instruction
            </label>
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
                <Button label="Cancel" id={`${movementId}__entry-cancel-button`} type="tertiary" clickHandler={hideEntryForm} />
                <Button label="Save" id={`${movementId}__entry-save-button`} icon="/img/add--white.svg" clickHandler={saveEntryForm} />
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
                <Button label="Cancel"
                    id={`${movementId}__note-cancel-button`}
                    clickHandler={hideNoteForm}
                    type="tertiary" />
                <Button label="Save"
                    id={`${movementId}__note-save-button`}
                    clickHandler={saveNoteForm} />
            </div>
        </form>
    </div>
}

export default MovementJournal
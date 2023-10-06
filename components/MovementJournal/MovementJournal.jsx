import React, { useState, useRef, useEffect } from 'react'
import styles from './MovementJournal.module.scss';
import Button from '../Button'

const MovementJournal = ({journalData, movementId, routineId, setCardInfo, apiUrl, loadJournal, refreshWorkoutData}) => {
    function showEntryForm() {
        let form = document.querySelector(`#entry-form-${movementId}`);
        let buttonRow = document.querySelector(`#button-row-${movementId}`);
        const formVisibleClass = styles['movement-journal__form--visible'];
        const buttonRowVisibleClass = styles['movement-journal__button-row--visible'];
        form.classList.add(formVisibleClass);
        buttonRow.classList.remove(buttonRowVisibleClass);
    }

    function hideEntryForm() {
        const instruction = document.querySelector(`#instruction-${movementId}`);
        const weight = document.querySelector(`#weight-input-${movementId}`);
        const sets = document.querySelector(`#sets-input-${movementId}`);
        const reps = document.querySelector(`#reps-input-${movementId}`);
        let form = document.querySelector(`#entry-form-${movementId}`);
        let buttonRow = document.querySelector(`#button-row-${movementId}`);
        const formVisibleClass = styles['movement-journal__form--visible'];
        const buttonRowVisibleClass = styles['movement-journal__button-row--visible'];
        form.classList.remove(formVisibleClass);
        buttonRow.classList.add(buttonRowVisibleClass);
        instruction.checked = false;
        weight.value = '';
        sets.value = '';
        reps.value = '';
    }

    function saveEntryForm() {
        const instruction = document.querySelector(`#instruction-${movementId}`);
        const weight = document.querySelector(`#weight-input-${movementId}`);
        const sets = document.querySelector(`#sets-input-${movementId}`);
        const reps = document.querySelector(`#reps-input-${movementId}`);
        const url = `${apiUrl}/journal/addmovement/${movementId}/${routineId}/${weight.value}/${sets.value}/${reps.value}/${instruction.checked}`;
        
        fetch(url, {
            method: 'POST'
        }).then(() => {
            hideEntryForm();
            loadJournal();
            refreshWorkoutData();
        });

    }
    

    return <div className={styles["movement-journal"]}>
        <div className={`${styles['movement-journal__button-row']} ${styles['movement-journal__button-row--visible']}`} id={`button-row-${movementId}`}>
            <Button label="Add entry" id={`add-entry-${movementId}`} clickHandler={showEntryForm}/>
            <Button label="Add note" id={`add-note-${movementId}`}/>
        </div>
        <form action="" className={styles['movement-journal__form']} id={`entry-form-${movementId}`}>
            <div className={styles["movement-journal__form-header"]}>
                <p>Add entry</p>
                <label htmlFor="">
                    <input type="checkbox" id={`instruction-${movementId}`}/>
                    Instruction
                </label>
            </div>
            <div className={styles["movement-journal__form-inputs"]}>
                <label htmlFor="">
                    <input type="number" id={`weight-input-${movementId}`}/>
                    lbs
                </label>
                <label htmlFor="">
                    <input type="number" id={`sets-input-${movementId}`}/>
                    sets
                </label>
                <label htmlFor="">
                    <input type="number" id={`reps-input-${movementId}`}/>
                    reps
                </label>
            </div>
            <div className={styles['movement-journal__form-buttons']}>
                <Button label="Save" id={`${movementId}__entry-save-button`} clickHandler={saveEntryForm} />
                <Button label="Cancel" id={`${movementId}__entry-cancel-button`} clickHandler={hideEntryForm} />
            </div>
        </form>
        <ul className={styles["movement-journal__journal"]}>
            { journalData.map((entry, i) => {
                return <li className={styles["movement-journal__entry"]} key={i}>
                    {/* <p className={styles["movement-journal__date"]}>{entry.completion_date}</p> */}
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
    </div>
}

export default MovementJournal
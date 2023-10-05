import React, { useState, useRef, useEffect } from 'react'
import styles from './MovementJournal.module.scss';
import Button from '../Button'

const MovementJournal = ({journalData, movementId}) => {

    function showEntryForm() {
        const form = document.querySelector(`.${styles['movement-journal__form']}`);
        const buttonRow = document.querySelector(`.${styles['movement-journal__button-row']}`);
        const formVisibleClass = styles['movement-journal__form--visible'];
        const buttonRowVisibleClass = styles['movement-journal__button-row--visible'];
        form.classList.add(formVisibleClass);
        buttonRow.classList.remove(buttonRowVisibleClass);
    }

    function hideEntryForm() {
        const form = document.querySelector(`.${styles['movement-journal__form']}`);
        const buttonRow = document.querySelector(`.${styles['movement-journal__button-row']}`);
        console.log(form);
        console.log(buttonRow)
    }
    

    return <div className={styles["movement-journal"]}>
        {/* <form className="movement-journal__add-entry"></form> */}
        <div className={`${styles['movement-journal__button-row']} ${styles['movement-journal__button-row--visible']}`}>
            <Button label="Add entry" id={`${movementId}-add-entry`} clickHandler={showEntryForm}/>
            <Button label="Add note" id={`${movementId}-add-note`}/>
        </div>
        <form action="" className={styles['movement-journal__form']}>
            <div className={styles["movement-journal__form-header"]}>
                <p>Add entry</p>
                <label htmlFor="">
                    <input type="checkbox"/>
                    Instruction
                </label>
            </div>
            <div className={styles["movement-journal__form-inputs"]}>
                <label htmlFor="">
                    <input type="number" id={`${movementId}-weight-input`}/>
                    Lbs
                </label>
                <label htmlFor="">
                    <input type="number" id={`${movementId}-sets-input`}/>
                    Sets
                </label>
                <label htmlFor="">
                    <input type="number" id={`${movementId}-reps-input`}/>
                    Reps
                </label>
            </div>
            <div className={styles['movement-journal__form-buttons']}>
                <Button label="Save" id={`${movementId}__entry-save-button`}></Button>
                <Button label="Cancel" id={`${movementId}__entry-cancel-button`}></Button>
            </div>
        </form>
        <ul className={styles["movement-journal__journal"]}>
            { journalData.map((entry, i) => {
                return <li className={styles["movement-journal__entry"]} key={i}>
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

export default MovementJournal
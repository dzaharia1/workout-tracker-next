import React, { useState, useRef, useEffect } from 'react'
import styles from './Navigation.module.scss'
import IconButton from '../iconButton'
import Button from '../Button'

const Navigation = ({thisRoutine, routines, nextRoutine, today, apiUrl}) => {
    let [routineCompleted, setRoutineCompleted] = useState(thisRoutine.to_char === today);
    let [menuVisible, setMenuVisible] = useState(false);

    function markRoutineCompleted() {
        fetch(`${apiUrl}/routine/markComplete/${thisRoutine.routine_id}`, {
            method: 'POST',
            mode: 'no-cors'
        }).then(data => {
            console.log(data);
            setRoutineCompleted(true);
        })
    }

    function toggleMenu() {
        setMenuVisible(!menuVisible);
    }

    return <header className={styles['navigation__header-bar']}>
        <div className={styles['navigation__header-bar-section']}>
            <IconButton icon="/img/menu.svg" clickHandler={toggleMenu} />
        </div>
        <div>
            <h1>{thisRoutine.routine_name}</h1>
            {nextRoutine.routine_id == thisRoutine.routine_id ? <span className={styles['navigation__completed-indicator']}>on deck</span>: ``}
        </div>
        <div className={styles['navigation__header-bar-section']}>
            <button className={routineCompleted ? styles['navigation__completed-indicator']: styles['navigation__completed-button']} onClick={markRoutineCompleted}>complete</button>
        </div>
        <button className={`${styles['navigation__menu-scrim']} ${menuVisible && styles['navigation__menu-scrim--visible']}`} onClick={toggleMenu} />
        <navigation className={`${styles['navigation__menu']} ${menuVisible && styles['navigation__menu--visible']}`}>
            <div>
                <IconButton icon='/img/back.svg' clickHandler={toggleMenu}></IconButton>
                <h1>{thisRoutine.routine_name}</h1>
            </div>
            <ul>
                {routines.map((routine, id) => <li className={styles['navigation__menu-item']} key={id}>
                    <a href={`/${routine.routine_id}`}>{routine.routine_name}</a>
                    {(nextRoutine.routine_id == routine.routine_id) ? <span className={styles['navigation__completed-indicator']}>on deck</span> : <span></span>}
                    <p>Last: {routine.to_char}</p>
                </li>)}
            </ul>
        </navigation>
    </header>
}

export default Navigation;
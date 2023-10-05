import React, { useState, useRef, useEffect } from 'react'
import styles from './Navigation.module.scss'
import IconButton from '../iconButton'
import Button from '../Button'

const Navigation = ({thisRoutine, routines, nextRoutine}) => {
    const [routineCompleted, setRoutineCompleted] = useState(true);
    const apiUrl = process.env.API_URL || `http://localhost:3333`;

    // function toggleRoutineCompleted() {
    //     if (routineCompleted) {
    //         setRoutineCompleted(false);
    //     } else {
    //         setRoutineCompleted(true);
    //     }
    // }
    function markRoutineCompleted() {
        fetch(`${apiUrl}/routine/markComplete/${thisRoutine.routine_id}`, {
            method: 'POST',
            mode: 'no-cors'
        })
            .then(data => {
                console.log(styles['navigation__complete-button'])
                const completeButton = document.querySelector(`${styles['navigation__complete-button']}`)
                console.log(completeButton);
                completeButton.classList.add(styles['navigation__complete-indicator']);
            })
    }

    function toggleMenu() {
        const menu = document.querySelector('navigation');
        const scrim = document.querySelector(`.${styles['navigation__menu-scrim']}`)
        const menuVisibilityClass = styles['navigation__menu--visible'];
        const scrimVisibilityClass = styles['navigation__menu-scrim--visible']
        const menuVisible = menu.classList.contains(menuVisibilityClass);
        
        if (menuVisible) {
            menu.classList.remove(menuVisibilityClass);
            scrim.classList.remove(scrimVisibilityClass);
        } else {
            menu.classList.add(menuVisibilityClass);
            scrim.classList.add(scrimVisibilityClass);
        }
        
    }

    return <header className={styles['navigation__header-bar']}>
        <div className={styles['navigation__header-bar-section']}>
            <IconButton icon="/img/menu.svg" clickHandler={toggleMenu} />
        </div>
        <h1>{thisRoutine.routine_name}</h1>
        <div className={styles['navigation__header-bar-section']}>
            <button className={styles['navigation__complete-button']} onClick={markRoutineCompleted}>complete</button>
        </div>
        <button className={styles['navigation__menu-scrim']} onClick={toggleMenu} />
        <navigation className={styles['navigation__menu']}>
            <div>
                <IconButton icon='/img/back.svg' clickHandler={toggleMenu}></IconButton>
                <h1>{thisRoutine.routine_name}</h1>
            </div>
            <ul>
                {routines.map((routine, id) => <li className={styles['navigation__menu-item']} key={id}>
                    <a href={`/routine/${routine.routine_id}`}>{routine.routine_name}</a>
                    {(nextRoutine.routine_id == routine.routine_id) ? <span className={styles['navigation__completed-indicator']}>current</span> : <span></span>}
                </li>)}
            </ul>
        </navigation>
    </header>
}

export default Navigation;
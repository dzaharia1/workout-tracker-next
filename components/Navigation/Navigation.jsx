import React, { useState, useRef, useContext } from 'react';
import { AppContext } from '../AppContext';
import styles from './Navigation.module.scss';
import IconButton from '../iconButton';
import Button from '../Button';
import Image from 'next/image';
import Badge from '../Badge';


const Navigation = ({thisRoutine, routines, nextRoutine, superSets}) => {
    const {apiUrl, today} = useContext(AppContext);
    const [routineCompleted, setRoutineCompleted] = useState(thisRoutine.to_char === today);
    const [menuVisible, setMenuVisible] = useState(false);
    const [confirmCompleted, setConfirmCompleted] = useState(false);

    function markRoutineCompleted() {
        fetch(`${apiUrl}/routine/markComplete/${thisRoutine.routine_id}`, {
            method: 'POST',
            mode: 'no-cors'
        }).then(data => {
            console.log(data);
            setRoutineCompleted(true);
            setConfirmCompleted(false);
        })
    }

    function toggleMenu() {
        setMenuVisible(!menuVisible);
    }

    return <div>
        <button
            onClick={toggleMenu}
            className={`${styles['navigation__menu-scrim']} ${menuVisible && styles['navigation__menu-scrim--visible']}`} />
        <ul className={`${styles['navigation__menu']} ${menuVisible && styles['navigation__menu--visible']}`}>
            { routines.map((routine, id) => {
                return <li className={styles['navigation__menu-item']} key={id}>
                    <a href={`/${routine.routine_id}`} className={styles['navigation__menu-item-header']}>
                        <h4>{routine.routine_name}</h4>
                        <p>last: {routine.to_char}</p>
                    </a>
                    {nextRoutine.routine_id == routine.routine_id && <Badge type="on-deck"/>}
                </li>
            })}
        </ul>
        <header className={`${styles['navigation__header-bar']} ${menuVisible && styles['navigation__header-bar--menu-visible']}`}>
            <Image
                src={menuVisible? `/img/expand.svg` : "/img/menu.svg"}
                width="24px"
                height="24px"
                onClick={toggleMenu} />
            <div className={styles['navigation__title']} onClick={toggleMenu}>
                <h1>{thisRoutine.routine_name}</h1>
                { thisRoutine.routine_id == nextRoutine.routine_id ?
                    <p className={styles['navigation__title-on-deck-indicator']}>on deck</p> :
                    <p className={styles['navigation__title-last-indicator']}>last: {thisRoutine.to_char}</p> }
            </div>
            {(!routineCompleted && !confirmCompleted) &&
                <div className={styles['navigation__progress-bar']}>
                    { superSets.map((superSet, i) => {
                        return superSet.movements.map((movement, j) => {
                            return <div className={movement.to_char === today ? styles['super-set__complete-indicator--complete'] : styles['super-set__complete-indicator--to-do']} key={(i + 1) * (j + 1)}></div>
                        })
                    })}
                </div>
            }
            {routineCompleted ?
                <Button 
                    icon="/img/complete.svg" 
                    type="complete" 
                    label="complete" /> :
                confirmCompleted ?
                    <div className={styles['navigation__confirmation-bar']}>
                        <Button
                            icon="/img/complete.svg"
                            type="secondary"
                            label="mark complete?"
                            clickHandler={markRoutineCompleted} />
                        <IconButton
                            icon="/img/close.svg"
                            type="tertiary"
                            clickHandler={() => setConfirmCompleted(false)}/>
                    </div> :
                    <IconButton
                        icon="/img/complete.svg"
                        type="tertiary"
                        clickHandler={() => setConfirmCompleted(true)}/>
            }
        </header>
    </div>
}

export default Navigation;
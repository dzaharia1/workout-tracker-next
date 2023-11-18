import React, { useState, useRef, useContext, useEffect } from 'react';
import { AppContext } from '../AppContext';
import styles from './Navigation.module.scss';
import IconButton from '../iconButton';
import Image from 'next/image';
import Badge from '../Badge';
import Overlay from '../Overlay';
import Calendar from '../Calendar';
import LogoHeader from '../LogoHeader';
import CompleteButton from '../CompleteButton';


const Navigation = ({thisRoutine, routines, nextRoutine, superSets}) => {
    const {apiUrl, today} = useContext(AppContext);
    const [menuVisible, setMenuVisible] = useState(false);
    const [routineJournal, setRoutineJournal] = useState([]);

    useEffect(() => {
        loadRoutineJournal();
    })

    function toggleMenu() {
        setMenuVisible(!menuVisible);
    }

    function loadRoutineJournal() {
        const url = `${apiUrl}/routineJournal`;
        fetch(url)
            .then(response => response.json())
            .then(data => setRoutineJournal(data))
    }

    const renderJournalDates = ({ date }) => {
        const thisTileDate = `${date.getMonth() + 1} ${date.getDate()}, ${date.getFullYear()}`;

        let routinesList = ``;

        for (let journalItem of routineJournal) {
            if (thisTileDate === journalItem.pretty_date) {
                routinesList === '' ? 
                    routinesList = `${journalItem.routine_name.substring(4)}` :
                    routinesList += `, ${journalItem.routine_name.substring(4)}`
            }
        }

        if (routinesList.length != '') {
            return <div className={styles['Calendar__routine-log']}>
                <p>{date.getDate()}</p>
                <p>{routinesList}</p>
            </div>
        }
    }

    return <div className={styles['navigation']}>
        <div className={styles['navigation__logo-header']}>
            <LogoHeader routine={thisRoutine.routine_name}/>
        </div>
        <button
            onClick={toggleMenu}
            className={`${styles['navigation__menu-scrim']} ${menuVisible && styles['navigation__menu-scrim--visible']}`} />
        <ul className={`${styles['navigation__menu']} ${menuVisible && styles['navigation__menu--visible']}`}>
            { routines.map((routine, id) => {
                return <li className={`${styles['navigation__menu-item']} ${routine.routine_id === thisRoutine.routine_id ? styles['navigation__menu-item--active']: null}`} key={id}>
                    <a href={`/${routine.routine_id}`} className={styles['navigation__menu-item-header']}>
                        <h4>{routine.routine_name}</h4>
                        
                        {routine.last_logged == today ? 
                            <p className={`${styles['navigation__title-last-indicator']} ${styles['navigation__title-last-indicator--today']}`}>today</p> :
                            <p className={styles['navigation__title-last-indicator']}>last: {routine.last_logged}</p>}
                    </a>
                    {nextRoutine.routine_id == routine.routine_id && <Badge type="on-deck"/>}
                </li>
            })}
        </ul>
        <div className={`${styles['navigation__footer-bar']} ${menuVisible && styles['navigation__footer-bar--menu-visible']}`}>
            <Image
                src={menuVisible? `/img/expand.svg` : "/img/menu.svg"}
                width="24px"
                height="24px"
                onClick={toggleMenu} />
            <div className={styles['navigation__title']} onClick={toggleMenu}>
                <h1>{thisRoutine.routine_name}</h1>
                { thisRoutine.routine_id == nextRoutine.routine_id ?
                    <p className={styles['navigation__title-on-deck-indicator']}>on deck</p> :
                    thisRoutine.last_logged == today ? 
                        <p className={`${styles['navigation__title-last-indicator']} ${styles['navigation__title-last-indicator--today']}`}>today</p> :
                        <p className={styles['navigation__title-last-indicator']}>last: {thisRoutine.last_logged}</p>
                }
            </div>
            <div className={styles['navigation__progress-bar']}>
                { superSets.map((superSet, i) => {
                    return superSet.movements.map((movement, j) => {
                        return <div className={movement.last_logged === today ? styles['super-set__complete-indicator--complete'] : styles['super-set__complete-indicator--to-do']} key={(i + 1) * (j + 1)}></div>
                    })
                })}
            </div>
            <Overlay
                title="Journal"
                onShow={() => {
                    loadRoutineJournal();
                    setMenuVisible(false);
                }}
                triggerIcon="/img/journal.svg"
                sizing="hug"
                buttonType="tertiary">
                    <Calendar routineJournal={routineJournal} />
            </Overlay>
        </div>
        <div className={styles['navigation__calendar']}>
            <Calendar routineJournal={routineJournal} />
        </div>
    </div>
}

export default Navigation;
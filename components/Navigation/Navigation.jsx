import React, { useState, useRef, useContext } from 'react';
import { AppContext } from '../AppContext';
import styles from './Navigation.module.scss';
import IconButton from '../iconButton';
import Button from '../Button';
import Image from 'next/image';
import Badge from '../Badge';
import Overlay from '../Overlay';
import Calendar from 'react-calendar';


const Navigation = ({thisRoutine, routines, nextRoutine, superSets}) => {
    const {today} = useContext(AppContext);
    const [menuVisible, setMenuVisible] = useState(false);

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
                triggerIcon="/img/journal.svg"
                sizing="hug"
                buttonType="tertiary">
                    <Calendar></Calendar>
            </Overlay>
        </div>

    </div>
}

export default Navigation;
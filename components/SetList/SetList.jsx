import React, { useState, useRef, useContext } from 'react';
import { AppContext } from '../AppContext';
import MovementCard from '../MovementCard';
import styles from './setList.module.scss';
import IconButton from '../iconButton';
import LogoHeader from '../LogoHeader';

const SetList = ({superSets, thisRoutine}) => {
    const {today} = useContext(AppContext);

    return <section className={styles["supersets"]}>
        <div className={styles['supersets__logo-header']}>
            <LogoHeader routine={thisRoutine.routine_name} />
        </div>
        { superSets.map((superSet, i) => {
            return <div className={styles["super-set"]} key={i}>
                <header className={styles["super-set__header"]}>
                    <h3>Superset {superSet.id}</h3>
                    <div className={styles['super-set__header-rule-line']}></div>
                    {superSet.movements.map((movement, i) => {
                        return <div className={movement.last_logged === today ? styles['super-set__complete-indicator--complete'] : styles['super-set__complete-indicator--to-do']} key={i}></div>
                    })}
                    {/* <IconButton icon="/img/add.svg" type="tertiary" /> */}
                </header>
                <ul className={styles["super-set__movement-list"]}>
                    { superSet.movements.map((movement, j) => {
                        const movementInfo = {
                            displayName: movement.movement_name,
                            last_logged: movement.last_logged,
                            weight: movement.weight,
                            sets: movement.num_sets,
                            reps: movement.num_reps,
                            instruction: movement.instruction,
                            movementId: movement.movement_id
                        };
                        return <MovementCard movementInfo={movementInfo}
                            key={j}
                            setId={superSet.id}
                            superSets={superSets} />
                    }) }
                </ul>
            </div>
        }) }
    </section>
}

export default SetList;
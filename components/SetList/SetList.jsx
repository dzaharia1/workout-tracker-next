import React, { useState, useRef, useContext } from 'react';
import { AppContext } from '../AppContext';
import setList from '.';
import MovementCard from '../MovementCard';
import styles from './setList.module.scss';

const SetList = ({superSets}) => {

    return <section className={styles["supersets"]}>
        { superSets.map((superSet, i) => {
            return <div className={styles["super-set"]} key={i}>
                <header className={styles["super-set__header"]}>
                    <h2>Superset {superSet.id}</h2>
                    {superSet.movements.map((movement, i) => {
                        return <div className={movement.to_char === useContext(AppContext).today ? styles['super-set__complete-indicator--complete'] : styles['super-set__complete-indicator']} key={i}></div>
                    })}
                </header>
                <ul className={styles["super-set__movement-list"]}>
                    { superSet.movements.map((movement, j) => {
                        const movementInfo = {
                            displayName: movement.movement_name,
                            last_logged: movement.to_char,
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